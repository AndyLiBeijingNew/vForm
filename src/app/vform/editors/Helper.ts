import {VFormComponent} from '../services/VFormComponent';
import {MetadataService} from '../services/metadata.service';
import * as _ from 'lodash';
import {ComponentFactoryResolver, ComponentRef, Type} from '@angular/core';
import {VFormComponentInstance} from '../services/VFormComponentInstance';
import {IRemovable} from '../services/IRemovable';

export class DragHelper {
  private static DataComponent = 'data-component';

  public static dragStart($event: any, component: VFormComponent) {
    $event.dataTransfer.setData(this.DataComponent, component.name);
  }

  public static drop($event: any, allowOnly: string[] = [], children: VFormComponentInstance[], metadata: MetadataService,
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
        componentRef.instance.properties = component.properties;
        children.push(new VFormComponentInstance(component, componentRef));

        (<IRemovable>componentRef.instance).removed.subscribe(p => {
          const found = _.findIndex(children, i => {
            return i.metadata.properties === p;
          });
          if (found >= 0) {
            (<IRemovable>children[found].componentRef.instance).removed.unsubscribe();
            children[found].componentRef.destroy();
            children.splice(found, 1);
          }
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
