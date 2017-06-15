import {VFormMetadata} from '../services/VFormMetadata';
import {MetadataService} from '../services/metadata.service';
import * as _ from 'lodash';
import {ComponentFactoryResolver, ComponentRef, Type} from '@angular/core';
import {IVFormComponent} from '../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {IVFormContainerComponent} from '../services/IVFormContainerComponent';

export class DragHelper {
  private static DataComponent = 'data-component';

  public static dragStart($event: any, component: VFormMetadata) {
    $event.dataTransfer.setData(this.DataComponent, component.name);
  }

  public static drop(target: IVFormContainerComponent, $event: any, componentMetadata: VFormMetadata, metadata: MetadataService,
                     resolver: ComponentFactoryResolver) {
    (<any>event.target).classList.remove('drag-over');

    const component = componentMetadata || metadata.getComponent($event.dataTransfer.getData(this.DataComponent));
    if (component) {

      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $event.dataTransfer.setData(this.DataComponent, null);
      }

      DragHelper.createComponent(target, component, resolver);
    }
  }

  public static createComponent(target: IVFormContainerComponent, componentMetadata: VFormMetadata, resolver: ComponentFactoryResolver) {
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
  }

  public static dragOver($event: DragEvent) {
    $event.preventDefault();
    (<any>event.target).classList.add('drag-over');
  }

  public static dragLeave($event: DragEvent) {
    $event.preventDefault();
    (<any>event.target).classList.remove('drag-over');
  }
}
