import {
  ChangeDetectorRef,
  Component, ComponentRef, ElementRef,
  OnInit, Renderer,
  ViewChild,
  ViewContainerRef, ViewRef
} from '@angular/core';
import { VFormMetadata } from '../../services/VFormMetadata';
import { MetadataService } from '../../services/metadata.service';
import { FormBuilder} from '@angular/forms';
import { HelperService } from '../property-editor/helper.service';
import * as _ from 'lodash';
import { IVFormComponent } from '../../services/IVFormComponent';
import { IVFormContainerComponent } from '../../services/IVFormContainerComponent';
import { PropertyEditorComponent } from '../property-editor/property-editor.component';
import { FormComponent } from '../../components/form/form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import {Helper} from '../../helpers/Helper';

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html'
})
export class FormEditorComponent implements OnInit, IVFormContainerComponent {
  editedComponent: IVFormComponent;
  view = 'editor';

  components: VFormMetadata[];
  metadata: VFormMetadata = new VFormMetadata('Form', '', 'FormComponent', {
    width: '1200px',
    height: '800px',
    flexWrap: 'wrap'
  });
  children: IVFormComponent[] = [];

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('formEditorForm') formEditorForm: ElementRef;
  @ViewChild('preview') preview: FormComponent;
  form: FormComponent;
  private previewFormInstanceValue: any = {};
  private previewFormInstanceStatus: any = {};

  constructor(private metadataService: MetadataService, private fb: FormBuilder,
    public helperService: HelperService, private self: ChangeDetectorRef,
    private dialog: MdDialog, private renderer: Renderer) {
    this.components = metadataService.components();
    this.form = new FormComponent(helperService, fb);
    helperService.editorLaunched.subscribe(instance => {
      this.editedComponent = instance;
      this.showPropertyEditor(instance);
    });
    helperService.componentDeleted.subscribe(instance => this.deleteMatching(<IVFormComponent>this, instance));

    // Save renederer in HelperService
    this.helperService.setRenderer(renderer);
  }

  private showPropertyEditor(instance: IVFormComponent) {
    this.dialog.open(PropertyEditorComponent, { data: instance });
  }

  ngOnInit() {
    this.helperService.setEditMode(true);
    this.helperService.registerShortcuts(<any>{instance: this, location: this.formEditorForm}, null);
  }

  dragStart($event, component: VFormMetadata): void {
    this.helperService.dragStart($event, component);
  }

  dragOver($event): void {
    this.helperService.dragOver($event);
  }

  dragLeave($event): void {
    this.helperService.dragLeave($event);
  }

  drop($event): void {
    this.helperService.drop(this, $event, null);
  }

  getJson() {
    const formRepresentation = Helper.getMetadata(this);
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
    this.helperService.setEditMode(true);
  }

  showPreview() {
    this.helperService.setEditMode(false);
    this.preview.form.reset();
    this.preview.metadata = this.getJson();
    this.view = 'preview';
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

  loadFormFileInputChanged(event: Event) {
    const files: FileList = (<any>event.target).files;
    if (files && files.length > 0) {
      const f = files[0];
      const fr = new FileReader();
      fr.onload = (e: Event) => {
        const data = (<any>e.target).result;
        if (data) {
          try {
            const tmp = JSON.parse(data);
            this.loadFormEditor(tmp);
          } catch (e) {
            console.log('Invalid JSON for form. ' + e);
          }
        }
      };
      fr.readAsText(f);
    }
  }

  loadFormEditor(value: VFormMetadata) {
    this.container.clear();
    this.metadata = value;
    _.forEach(this.metadata.children, c => this.helperService.createComponent(this, c));
  }

  downloadFormFile() {
    const templateStr = JSON.stringify(this.getJson());

    // Add UTF-8 BOM to resolve the messy-code issue.git
    const blob = new Blob(['\ufeff', templateStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
