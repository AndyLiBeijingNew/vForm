import {VFormMetadata} from '../services/VFormMetadata';
import {MetadataService} from '../services/metadata.service';
import * as _ from 'lodash';
import {ComponentFactoryResolver, ComponentRef, Type, ViewContainerRef} from '@angular/core';
import {IVFormComponent} from '../services/IVFormComponent';
import {IVFormContainerComponent} from '../services/IVFormContainerComponent';
import {FormGroup} from '@angular/forms';
import { InputFieldBase } from "../components/input-field/InputFieldBase";

export class Helper {
  private static DataComponent = 'data-component';

  public static dragStart($event: any, component: VFormMetadata) {
    $event.dataTransfer.setData(this.DataComponent, component.name);
  }

  public static drop(target: IVFormContainerComponent, $event: any, componentMetadata: VFormMetadata, metadata: MetadataService,
                     resolver: ComponentFactoryResolver) {
    const component = componentMetadata || metadata.getComponent($event.dataTransfer.getData(this.DataComponent));
    if (component) {

      if ($event) {
        (<any>$event.target).classList.remove('drag-over');
        $event.preventDefault();
        $event.stopPropagation();
      }

      Helper.createComponent(target, component, resolver, true);
    }
  }

  public static createComponent(target: IVFormContainerComponent, componentMetadata: VFormMetadata, resolver: ComponentFactoryResolver, isEditMode: boolean = false) {
    const factories = Array.from(resolver['_factories'].keys());
    const factoryClass = <Type<any>>factories.find((x: any) => x.name === componentMetadata.type);
    const factory = resolver.resolveComponentFactory(factoryClass);
    const componentRef: ComponentRef<any> = target.container.createComponent(factory);
    (<IVFormComponent>componentRef.instance).metadata = componentMetadata;
    (<IVFormComponent>componentRef.instance).form = target.form;
    (<IVFormComponent>componentRef.instance).componentRef = componentRef;
    if('createControl' in componentRef.instance)
    {// Whether this component derives from InputFieldBase
      (<InputFieldBase>componentRef.instance).initModel();
      (<InputFieldBase>componentRef.instance).value = 'initialized value';
    }
    target.children.push(<IVFormComponent>componentRef.instance);

    if (componentMetadata.children && componentMetadata.children.length) {
      _.forEach(componentMetadata.children, c => {
        this.createComponent(<IVFormContainerComponent>componentRef.instance, c, resolver);
      });
    }
  }

  public static createComponentInViewContainerRef(fg: FormGroup, vcr: ViewContainerRef, componentMetadata: VFormMetadata, resolver: ComponentFactoryResolver) {
    const factories = Array.from(resolver['_factories'].keys());
    const factoryClass = <Type<any>>factories.find((x: any) => x.name === componentMetadata.type);
    const factory = resolver.resolveComponentFactory(factoryClass);
    const componentRef: ComponentRef<any> = vcr.createComponent(factory);
    (<IVFormComponent>componentRef.instance).metadata = componentMetadata;
    (<IVFormComponent>componentRef.instance).form = fg;
    (<IVFormComponent>componentRef.instance).componentRef = componentRef;
  }

  public static dragOver($event: DragEvent) {
    $event.preventDefault();
    (<any>$event.target).classList.add('drag-over');
  }

  public static dragLeave($event: DragEvent) {
    $event.preventDefault();
    (<any>$event.target).classList.remove('drag-over');
  }

  public static formExpression(form: FormGroup, expression: string): boolean {
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
