import {
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter, HostListener, Input, OnInit, Output, Type, ViewChild,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {DragHelper} from '../../editors/Helper';
import {MetadataService} from '../../services/metadata.service';
import {VFormComponent} from '../../services/VFormComponent';
import {PropertyEditorComponent} from '../../editors/property-editor/property-editor.component';
import {VFormComponentInstance} from '../../services/VFormComponentInstance';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    host: {
      '[style.width]': 'metadata.properties.width', '[style.height]': 'metadata.properties.height',
      '[style.border]': 'metadata.properties.border', '[class]': 'metadata.properties.class',
      '[style.padding]': 'metadata.properties.padding',
      '[style.alignItems]': 'metadata.properties.alignItems', '[style.justifyContent]': 'metadata.properties.justifyContent',
      '[style.borderCollapse]': 'metadata.properties.collapse', '[style.flexFlow]': 'metadata.properties.flexFlow',
      '[style.flexGrow]': 'metadata.properties.flexGrow'
    },
  })
export class LayoutComponent implements IVFormComponent {
  @ViewChild ('container', { read: ViewContainerRef }) container: any;

  children: VFormComponentInstance[] = [];
  @Input()
  form: FormGroup;

  @Output()
  public removed: EventEmitter<VFormComponent> = new EventEmitter<VFormComponent>();

  @Input()
  public metadata: VFormComponent;

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
    DragHelper.drop(this.form, this.metadata, $event, [], this.children, this.metadataService, this.resolver, this.container);
  }

  constructor(private metadataService: MetadataService, private resolver: ComponentFactoryResolver) {
  }

  remove(): void {
    this.removed.next(this.metadata);
  }
}
