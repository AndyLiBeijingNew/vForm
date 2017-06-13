import {
  AfterViewInit,
  Compiler, Component, ComponentFactoryResolver, ComponentRef, OnInit, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DragHelper} from '../Helper';
import {VFormComponent} from '../../services/VFormComponent';
import {MetadataService} from '../../services/metadata.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToggleEditorService} from '../property-editor/toggle-editor.service';
import {VFormComponentInstance} from '../../services/VFormComponentInstance';
import * as _ from 'lodash';

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html'
})
export class FormEditorComponent implements AfterViewInit {

  components: VFormComponent[];
  metadata: VFormComponent = new VFormComponent('Form', '', 'FormComponent');
  children: VFormComponentInstance[] = [];

  @ViewChild('container', { read: ViewContainerRef }) container: any;
  private isViewInitialized = false;
  private form: FormGroup;

  constructor(private metadataService: MetadataService, private resolver: ComponentFactoryResolver, private fb: FormBuilder,
              public toggleEditorService: ToggleEditorService) {
    this.components = metadataService.components();
    this.form = this.fb.group({});
  }


  ngAfterViewInit() {
    this.isViewInitialized = true;
  }

  dragStart($event, component: VFormComponent): void {
    DragHelper.dragStart($event, component);
  }

  dragOver($event): void {
    DragHelper.dragOver($event);
  }

  dragLeave($event): void {
    DragHelper.dragLeave($event);
  }

  drop($event): void {
    DragHelper.drop(this.metadata, $event, [], this.children, this.metadataService, this.resolver, this.container);
  }

  toggleEditor() {
    this.toggleEditorService.toggle();
  }

  getJson() {
    return _.map(this.children, i => i.metadata);
  }
}
