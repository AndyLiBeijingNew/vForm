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

  public createComponent(target: IVFormContainerComponent, componentMetadata: VFormMetadata,
                         index: IListItemIndex = null) {
    const componentRef: ComponentRef<any> = target.container.createComponent(this.factories[componentMetadata.type]);
    (<IVFormComponent>componentRef.instance).metadata = componentMetadata;
    (<IVFormComponent>componentRef.instance).form = target.form;
    (<IVFormComponent>componentRef.instance).componentRef = componentRef;
    target.children.push(<IVFormComponent>componentRef.instance);

    if (this.isInEditMode) {
      const nativeElement = componentRef.location.nativeElement;
      this.renderer.setElementAttribute(nativeElement, 'tabindex', '-1');
      this.renderer.listen(nativeElement, 'contextmenu', (e: MouseEvent) => {
        if (e.ctrlKey || e.shiftKey) {
          if (e.shiftKey && e.ctrlKey) {
            const clonedMetadata: VFormMetadata = Helper.getMetadata(componentRef.instance);
            this.createComponent(target, clonedMetadata);
          } else if (e.ctrlKey) {
           this.edit(componentRef.instance);
          }
          e.stopImmediatePropagation();
          e.preventDefault();
          return false;
        }
      });
    }

    if (componentMetadata.children && componentMetadata.children.length) {
      _.forEach(componentMetadata.children, c => {
        this.createComponent(<IVFormContainerComponent>componentRef.instance, c);
      });
    }

    if ('itemIndex' in componentRef.instance) {
      (<IListItemIndex>componentRef.instance).itemIndex = index;
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
