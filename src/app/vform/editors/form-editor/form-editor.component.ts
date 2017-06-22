import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Helper} from '../../helpers/Helper';
import {VFormMetadata} from '../../services/VFormMetadata';
import {MetadataService} from '../../services/metadata.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StateService} from '../property-editor/state.service';
import * as _ from 'lodash';
import {IVFormComponent} from '../../services/IVFormComponent';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';
import {PropertyEditorComponent} from '../property-editor/property-editor.component';
import {FormComponent} from '../../components/form/form.component';
import {DomSanitizer} from '@angular/platform-browser';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html'
})
export class FormEditorComponent implements AfterViewInit, IVFormContainerComponent {
  editedComponent: IVFormComponent;
  view = 'editor';

  components: VFormMetadata[];
  metadata: VFormMetadata = new VFormMetadata('Form', '', 'FormComponent', {
    width: '800px',
    height: '600px',
    flexWrap: 'wrap'
  });
  children: IVFormComponent[] = [];

  @ViewChild('container', {read: ViewContainerRef}) container: any;
  previewJson: VFormMetadata;
  @ViewChild('preview') preview: FormComponent;
  private isViewInitialized = false;
  form: FormGroup;
  private previewFormInstanceValue: any = {};
  private previewFormInstanceStatus: any = {};

  constructor(private metadataService: MetadataService, private resolver: ComponentFactoryResolver, private fb: FormBuilder,
              public stateService: StateService, private self: ChangeDetectorRef, private sanitizer: DomSanitizer,
              private dialog: MdDialog) {
    this.components = metadataService.components();
    this.form = this.fb.group({});
    stateService.editorLaunched.subscribe(instance => {
      this.editedComponent = instance;
      this.showPropertyEditor(instance);
    });
    stateService.componentDeleted.subscribe(instance => this.deleteMatching(<IVFormComponent> this, instance));
  }

  private showPropertyEditor(instance: IVFormComponent) {
    this.dialog.open(PropertyEditorComponent, {data: instance});
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
  }

  dragStart($event, component: VFormMetadata): void {
    Helper.dragStart($event, component);
  }

  dragOver($event): void {
    Helper.dragOver($event);
  }

  dragLeave($event): void {
    Helper.dragLeave($event);
  }

  drop($event): void {
    Helper.drop(this, $event, null, this.metadataService, this.resolver);
  }

  showEditorHandle(value: any) {
    this.stateService.setEditorHandleVisibility(value);
  }

  getJson() {
    const getMetadata = (c: IVFormComponent) => {
      const m = _.cloneDeep(c.metadata);
      m.children = [];
      _.forEach(c.children, child => {
        m.children.push(getMetadata(child));
      });
      return m;
    };
    const formRepresentation = getMetadata(this);
    return formRepresentation;
  }

  deleteMatching(parent: IVFormComponent, find: IVFormComponent): IVFormComponent {
    if (parent.children) {
      const index = _.findIndex(parent.children, i => i.componentRef === find.componentRef || this.deleteMatching(i, find));
      if (index > -1) {
        const tmp = parent.children[index];
        tmp.componentRef.destroy();
        parent.children.splice(index, 1);
      }
    }
    return null;
  }

  showEditor() {
    this.view = 'editor';
  }

  showPreview() {
    this.preview.form.reset();
    this.preview.metadata = this.getJson();
    this.view = 'preview';
  }

  showJson() {
    this.view = 'json';
    this.previewJson = this.getJson();
  }

  previewFormValueChanged(e: any) {
    this.previewFormInstanceValue = e;
  }

  previewFormStatusChanged(e: any) {
    this.previewFormInstanceStatus = e;
  }

  setPreviewFormData(dataStr: string) {
    this.preview.setData(JSON.parse(dataStr));
  }
}
