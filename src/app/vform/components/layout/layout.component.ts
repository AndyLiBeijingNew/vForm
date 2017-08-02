import {
  Component,
  ComponentFactoryResolver,
  ComponentRef, ElementRef,
  HostListener,
  Input, Renderer,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Helper} from '../../helpers/Helper';
import {MetadataService} from '../../services/metadata.service';
import {VFormMetadata} from '../../services/VFormMetadata';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';
import {HelperService} from '../../editors/property-editor/helper.service';
import {VFormComponentBase} from '../VFormComponentBase';

@Component({
  selector: 'vform-layout',
  templateUrl: './layout.component.html',
  host: {
    '[style.width]': 'metadata.properties.width', '[style.height]': 'metadata.properties.height',
    '[style.borderTop]': 'metadata.properties.borderTop',
    '[style.borderRight]': 'metadata.properties.borderRight',
    '[style.borderBottom]': 'metadata.properties.borderBottom',
    '[style.borderLeft]': 'metadata.properties.borderLeft',
    '[class]': 'metadata.properties.class',
    '[style.padding]': 'metadata.properties.padding',
    '[style.alignItems]': 'metadata.properties.alignItems',
    '[style.alignSelf]': 'metadata.properties.alignSelf',
    '[style.justifyContent]': 'metadata.properties.justifyContent',
    '[style.flexFlow]': 'metadata.properties.flexFlow',
    '[style.flexGrow]': 'metadata.properties.flexGrow',
    '[style.display]': 'metadata.properties.display',
    '[hidden]': 'isHidden()'
  }
})
export class LayoutComponent extends VFormComponentBase implements IVFormContainerComponent {
  @ViewChild('container', {read: ViewContainerRef}) container: any;

  @HostListener('dragover', ['$event'])
  dragOver($event): void {
    this.helperService.dragOver($event);
  }

  @HostListener('dragleave', ['$event'])
  dragLeave($event): void {
    this.helperService.dragLeave($event);
  }

  @HostListener('drop', ['$event'])
  drop($event): void {
    this.helperService.drop(this, $event, null, this.metadataService, this.resolver);
  }

  constructor(private metadataService: MetadataService, private resolver: ComponentFactoryResolver,
              stateService: HelperService) {
    super(stateService);
  }
}
