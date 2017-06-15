import {
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter, HostListener, Input, OnInit, Output, Type, ViewChild,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {DragHelper} from '../../editors/Helper';
import {MetadataService} from '../../services/metadata.service';
import {VFormMetadata} from '../../services/VFormMetadata';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';
import {StateService} from '../../editors/property-editor/state.service';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    host: {
      '[style.width]': 'metadata.properties.width', '[style.height]': 'metadata.properties.height',
      '[style.border]': 'metadata.properties.border', '[class]': 'metadata.properties.class',
      '[style.padding]': 'metadata.properties.padding',
      '[style.alignItems]': 'metadata.properties.alignItems', '[style.justifyContent]': 'metadata.properties.justifyContent',
      '[style.borderCollapse]': 'metadata.properties.collapse', '[style.flexFlow]': 'metadata.properties.flexFlow',
      '[style.flexGrow]': 'metadata.properties.flexGrow', '[style.display]': '"flex"'
    },
  })
export class LayoutComponent implements IVFormContainerComponent {
  @ViewChild ('container', { read: ViewContainerRef }) container: any;

  children: IVFormComponent[] = [];
  @Input()
  form: FormGroup;

  @Input()
  public metadata: VFormMetadata;

  componentRef: ComponentRef<any>;

  @HostListener('dragover', ['$event'])
  dragOver($event): void {
    DragHelper.dragOver($event);
  }

  @HostListener('dragleave', ['$event'])
  dragLeave($event): void {
    DragHelper.dragLeave($event);
  }

  @HostListener('drop', ['$event'])
  drop($event): void {
    DragHelper.drop(this, $event, null, this.metadataService, this.resolver);
  }

  constructor(private metadataService: MetadataService, private resolver: ComponentFactoryResolver, private stateService: StateService) {
  }
}
