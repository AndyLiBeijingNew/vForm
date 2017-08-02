import {ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, Type, ViewContainerRef} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {FormComponent} from '../../components/form/form.component';
import {VFormMetadata} from '../../services/VFormMetadata';
import {IListItemIndex} from '../../components/IListItemIndex';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';
import {MetadataService} from '../../services/metadata.service';
import * as _ from 'lodash';

@Injectable()
export class HelperService {
  isInEditMode = true;
  editorLaunched: EventEmitter<IVFormComponent> = new EventEmitter<IVFormComponent>();
  propertyChanged: EventEmitter<[IVFormComponent, string, any]> = new EventEmitter<[IVFormComponent, string, any]>();
  DataComponent = 'data-component';

  componentDeleted: EventEmitter<IVFormComponent> = new EventEmitter<IVFormComponent>();

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

  public dragStart($event: any, component: VFormMetadata) {
    $event.dataTransfer.setData(this.DataComponent, component.name);
  }

  public drop(target: IVFormContainerComponent, $event: any, componentMetadata: VFormMetadata, metadata: MetadataService,
                     resolver: ComponentFactoryResolver) {
    const component = componentMetadata || metadata.getComponent($event.dataTransfer.getData(this.DataComponent));
    if (component) {

      if ($event) {
        (<any>$event.target).classList.remove('drag-over');
        $event.preventDefault();
        $event.stopPropagation();
      }

      this.createComponent(target, component, resolver);
    }
  }

  public createComponent(target: IVFormContainerComponent, componentMetadata: VFormMetadata,
                         resolver: ComponentFactoryResolver, index: IListItemIndex = null) {
    const factories = Array.from(resolver['_factories'].keys());
    const factoryClass = <Type<any>>factories.find((x: any) => x.name === componentMetadata.type);
    const factory = resolver.resolveComponentFactory(factoryClass);
    const componentRef: ComponentRef<any> = target.container.createComponent(factory);
    (<IVFormComponent>componentRef.instance).metadata = componentMetadata;
    (<IVFormComponent>componentRef.instance).form = target.form;
    (<IVFormComponent>componentRef.instance).componentRef = componentRef;
    target.children.push(<IVFormComponent>componentRef.instance);

    if (componentMetadata.children && componentMetadata.children.length) {
      _.forEach(componentMetadata.children, c => {
        this.createComponent(<IVFormContainerComponent>componentRef.instance, c, resolver);
      });
    }

    if ('itemIndex' in componentRef.instance) {
      (<IListItemIndex>componentRef.instance).itemIndex = index;
    }
  }

  public createComponentInViewContainerRef(fg: FormComponent, vcr: ViewContainerRef, componentMetadata: VFormMetadata,
                                           resolver: ComponentFactoryResolver) {
    const factories = Array.from(resolver['_factories'].keys());
    const factoryClass = <Type<any>>factories.find((x: any) => x.name === componentMetadata.type);
    const factory = resolver.resolveComponentFactory(factoryClass);
    const componentRef: ComponentRef<any> = vcr.createComponent(factory);
    (<IVFormComponent>componentRef.instance).metadata = componentMetadata;
    (<IVFormComponent>componentRef.instance).form = fg;
    (<IVFormComponent>componentRef.instance).componentRef = componentRef;
  }

  public dragOver($event: DragEvent) {
    $event.preventDefault();
    (<any>$event.target).classList.add('drag-over');
  }

  public dragLeave($event: DragEvent) {
    $event.preventDefault();
    (<any>$event.target).classList.remove('drag-over');
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
}
