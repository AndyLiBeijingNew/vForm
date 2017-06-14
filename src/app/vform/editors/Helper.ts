import {VFormComponent} from '../services/VFormComponent';
import {MetadataService} from '../services/metadata.service';
import * as _ from 'lodash';
import {ComponentFactoryResolver, ComponentRef, Type} from '@angular/core';
import {VFormComponentInstance} from '../services/VFormComponentInstance';
import {IVFormComponent} from '../services/IVFormComponent';
import {FormGroup} from '@angular/forms';

export class DragHelper {
  private static DataComponent = 'data-component';

  public static dragStart($event: any, component: VFormComponent) {
    $event.dataTransfer.setData(this.DataComponent, component.name);
  }

  public static drop(form: FormGroup, target: VFormComponent, $event: any, allowOnly: string[] = [], children: VFormComponentInstance[], metadata: MetadataService,
                     resolver: ComponentFactoryResolver, container: any) {
    (<any>event.target).classList.remove('drag-over');

    const data = $event.dataTransfer.getData(this.DataComponent);
    if (data && (allowOnly === null || allowOnly.length === 0 || _.some(allowOnly, i => data === i))) {
      const component = metadata.getComponent(data);
      if (component) {
        $event.preventDefault();
        $event.stopPropagation();
        $event.dataTransfer.setData(this.DataComponent, null);

        const factories = Array.from(resolver['_factories'].keys());
        const factoryClass = <Type<any>>factories.find((x: any) => x.name === component.type);
        const factory = resolver.resolveComponentFactory(factoryClass);
        const componentRef: ComponentRef<any> = container.createComponent(factory);
        (<IVFormComponent>componentRef.instance).metadata = component;
        (<IVFormComponent>componentRef.instance).form = form;
        children.push(new VFormComponentInstance(component, componentRef));
        target.children.push(component);

        (<IVFormComponent>componentRef.instance).removed.subscribe(p => {
          const found = _.remove(children, i => i.metadata === p);
          _.forEach(found, i => {
            (<IVFormComponent>i.componentRef.instance).removed.unsubscribe();
           i.componentRef.destroy();
          });
          _.remove(target.children, i => i === p);
        });
      }
    }
  }

  public static dragOver($event: DragEvent) {
    $event.preventDefault();
    (<any>event.target).classList.add('drag-over');
  }

  public static dragLeave($event: DragEvent) {
    $event.preventDefault();
    (<any>event.target).classList.remove('drag-over');
  }

  public static createComponent(resolver: ComponentFactoryResolver, container: any, componentMetadata: VFormComponent):
  VFormComponentInstance {
    const factories = Array.from(resolver['_factories'].keys());
    const factoryClass = <Type<any>>factories.find((x: any) => x.name === componentMetadata.type);
    const factory = resolver.resolveComponentFactory(factoryClass);
    const componentRef: ComponentRef<any> = container.createComponent(factory);
    if (componentMetadata.properties) {
      for (const p in componentMetadata.properties) {
        if (p) {
          componentRef.instance.properties[p] = componentMetadata.properties[p];
        }
      }
    }
    return new VFormComponentInstance(componentMetadata, componentRef);
  }
}
