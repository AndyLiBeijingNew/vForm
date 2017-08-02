import {
  Component,
  HostListener,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
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
    this.helperService.drop(this, $event, null);
  }

  constructor(stateService: HelperService) {
    super(stateService);
  }
}
