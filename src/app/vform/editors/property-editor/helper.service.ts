import {
  ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injectable, Renderer, Type,
  ViewContainerRef
} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {FormComponent} from '../../components/form/form.component';
import {VFormMetadata} from '../../services/VFormMetadata';
import {IListItemIndex} from '../../components/IListItemIndex';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';
import {MetadataService} from '../../services/metadata.service';
import * as _ from 'lodash';
import {List} from 'lodash';
import {Helper} from '../../helpers/Helper';

@Injectable()
export class HelperService {
  isInEditMode = true;
  editorLaunched: EventEmitter<IVFormComponent> = new EventEmitter<IVFormComponent>();
  propertyChanged: EventEmitter<[IVFormComponent, string, any]> = new EventEmitter<[IVFormComponent, string, any]>();
  DataComponent = 'data-component';
  componentDeleted: EventEmitter<IVFormComponent> = new EventEmitter<IVFormComponent>();
  renderer: Renderer;
  factories: any = {};
  copied: VFormMetadata;
  selected: VFormMetadata;

  constructor (private resolver: ComponentFactoryResolver, private metadataService: MetadataService) {
    const factories: List<any>  = Array.from(resolver['_factories'].keys());
    _.forEach(factories, (f) => this.factories[f.name] = resolver.resolveComponentFactory(f));
  }

  setEditMode(value: boolean) {
    this.isInEditMode = value;
  }

  deleteComponent(instance: IVFormComponent) {
    this.componentDeleted.emit(instance);
  }

  edit(component: IVFormComponent) {
    this.editorLaunched.emit(component);
  }

  changeProperty(instance: IVFormComponent, key: string, value: any) {
    this.propertyChanged.emit([instance, key, value]);
  }

  public dragStart($event: DragEvent, component: VFormMetadata) {
    $event.dataTransfer.setData(this.DataComponent, component.name);
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    return false;
  }

  public drop(target: IVFormContainerComponent, $event: any, componentMetadata: VFormMetadata) {
    const component = componentMetadata || this.metadataService.getComponent($event.dataTransfer.getData(this.DataComponent));
    if (component) {

      if ($event) {
        (<any>$event.target).classList.remove('drag-over');
        $event.stopImmediatePropagation();
        $event.stopPropagation();
      }

      this.createComponent(target, component);
      return false;
    }
  }

  public createComponent(target: IVFormContainerComponent, componentMetadata: VFormMetadata): IVFormComponent {
    const componentRef: ComponentRef<any> = target.container.createComponent(this.factories[componentMetadata.type]);
    (<IVFormComponent>componentRef.instance).metadata = componentMetadata;
    (<IVFormComponent>componentRef.instance).form = target.form;
    (<IVFormComponent>componentRef.instance).componentRef = componentRef;
    target.children.push(<IVFormComponent>componentRef.instance);

    this.registerShortcuts(componentRef, target);

    if (componentMetadata.children && componentMetadata.children.length) {
      _.forEach(componentMetadata.children, c => {
        this.createComponent(<IVFormContainerComponent>componentRef.instance, c);
      });
    }

    return componentRef.instance;
  }

  public registerShortcuts(componentRef: ComponentRef<any>, containerForComponentRef: IVFormContainerComponent) {
    if (this.isInEditMode) {
      const nativeElement = componentRef.location.nativeElement;
      this.renderer.setElementAttribute(nativeElement, 'tabindex', '1');
      this.renderer.listen(nativeElement, 'keydown', (e: KeyboardEvent) => {
        return this.handleShortcuts(e, componentRef, containerForComponentRef);
      });
      this.renderer.listen(nativeElement, 'focus', (e: Event) => {
        this.selected = componentRef.instance.metadata;
        e.stopImmediatePropagation();
        return false;
      });
      this.renderer.listen(nativeElement, 'focusout', (e: Event) => {
        this.selected = null;
        e.stopImmediatePropagation();
        return false;
      });
    }
  }

  private handleShortcuts(event: KeyboardEvent, componentRef: ComponentRef<any>,
                          containerForComponentRef: IVFormContainerComponent): boolean {
    if (event.altKey && (event.key === 'p' || event.key === 'v' || event.key === 'C'
        || event.key === 'V' || event.key === 'D' || event.key === 'X' || event.key === 'b'
        || event.key === 'B' || event.key === 'u' || event.key === 'U')) {
      if (event.key === 'C') {
        this.copied = Helper.getMetadata(componentRef.instance);
      } else if (event.key === 'V' && componentRef.instance.container) {
        this.pasteCopiedComponent(componentRef);
      }
      if (event.key === 'v') {
        const clonedMetadata: VFormMetadata = Helper.getMetadata(componentRef.instance);
        this.createComponent(containerForComponentRef, clonedMetadata);
      } else if (event.key === 'p') {
        this.edit(componentRef.instance);
      } else if (event.key === 'D') {
        this.deleteComponent(componentRef.instance);
      } else if (event.key === 'X') {
        this.copied = Helper.getMetadata(componentRef.instance);
        this.deleteComponent(componentRef.instance);
      } else if (event.key === 'b') {
        const bs = this.metadataService.defaultBorderSpecFor(componentRef.instance.metadata.properties.type);
        Helper.setBordersValues(event, componentRef.instance.metadata.properties,
          {borderTop: bs, borderRight: bs, borderBottom: bs, borderLeft: bs});
      } else if (event.key === 'B') {
        Helper.setBordersValues(event, componentRef.instance.metadata.properties,
          {borderTop: '', borderRight: '', borderBottom: '', borderLeft: ''});
      } else if (event.key === 'u' || event.key === 'U') {
        this.moveComponent(componentRef, containerForComponentRef, event.key === 'U');
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return false;
    }
    return true;
  }

  private pasteCopiedComponent(componentRefOfContainer: ComponentRef<any>) {
    if (this.copied && componentRefOfContainer.instance.container) {
      this.createComponent(componentRefOfContainer.instance, this.copied);
    }
  }

  private moveComponent(componentRef: ComponentRef<any>,
                        containerForComponentRef: IVFormContainerComponent,
                        down: boolean) {
    const containerViewRef = containerForComponentRef.container;
    if (!componentRef.instance || !containerViewRef || !containerForComponentRef.children) {
      return;
    }
    const indexOfToMove: number = <any> containerViewRef.indexOf(<any>componentRef);
    const elementsInContainer = containerViewRef.length;
    if (indexOfToMove > -1 && elementsInContainer > 1) {
      if (down && indexOfToMove < elementsInContainer - 1) {
        containerViewRef.move(containerViewRef.get(indexOfToMove), indexOfToMove + 1);
      } else if (!down && indexOfToMove > 0) {
        containerViewRef.move(containerViewRef.get(indexOfToMove), indexOfToMove - 1);
      }
    }
  }

  public dragOver($event: DragEvent) {
    $event.preventDefault();
    (<any>$event.target).classList.add('drag-over');
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    return false;
  }

  public dragLeave($event: DragEvent) {
    $event.preventDefault();
    (<any>$event.target).classList.remove('drag-over');
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    return false;
  }

  public formExpression(form: FormGroup, expression: string): boolean {
    if (expression) {
      try {
        return eval(expression);
      } catch (e) {
        console.log('Invalid Expression. "' + expression + '". ' + e);
      }
      return false;
    }
  }

  public setRenderer(renderer: Renderer) {
    this.renderer = renderer;
  }
}
