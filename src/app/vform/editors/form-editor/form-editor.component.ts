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

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html'
})
export class FormEditorComponent implements AfterViewInit {

  components: VFormComponent[];
  children: VFormComponentInstance[] = [];

  @ViewChild('container', { read: ViewContainerRef }) container: any;
  private isViewInitialized = false;
  private form: FormGroup;

  constructor(private metadata: MetadataService, private resolver: ComponentFactoryResolver, private fb: FormBuilder,
              public toggleEditorService: ToggleEditorService) {
    this.components = metadata.components();
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
    DragHelper.drop($event, [], this.children, this.metadata, this.resolver, this.container);
  }

  toggleEditor() {
    this.toggleEditorService.toggle();
  }
}
