import {
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter, HostListener, Input, OnInit, Output, Type, ViewChild,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {DragHelper} from '../../editors/Helper';
import {MetadataService} from '../../services/metadata.service';
import {VFormComponent} from '../../services/VFormComponent';
import {PropertyEditorComponent} from '../../editors/property-editor/property-editor.component';
import {VFormComponentInstance} from '../../services/VFormComponentInstance';
import {IRemovable} from '../../services/IRemovable';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    host: {
      '[style.width]': 'properties.width', '[style.height]': 'properties.height',
      '[style.border]': 'properties.border', '[class]': 'properties.class', '[style.padding]': 'properties.padding',
      '[style.alignItems]': 'properties.alignItems', '[style.justifyContent]': 'properties.justifyContent',
      '[style.borderCollapse]': 'collapse', '[style.flexFlow]': 'properties.flexFlow'
    },
  })
export class LayoutComponent implements OnInit, IRemovable {
  @ViewChild ('container', { read: ViewContainerRef }) container: any;
  @ViewChild ('propertyEditor') propertyEditor: PropertyEditorComponent;

  children: VFormComponentInstance[] = [];

  @Output()
  public removed: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  properties = {};

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
    DragHelper.drop($event, [], this.children, this.metadata, this.resolver, this.container);
  }

  constructor(private metadata: MetadataService, private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.propertyEditor.propertiesChange.subscribe(p => this.properties = p);
  }

  remove(): void {
    this.removed.next(this.properties);
  }
}
