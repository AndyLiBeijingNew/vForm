import {
  AfterViewInit, ChangeDetectorRef,
  Compiler, Component, ComponentFactoryResolver, ComponentRef, EventEmitter, OnInit, Type, ViewChild,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {DragHelper} from '../Helper';
import {VFormComponent} from '../../services/VFormMetadata';
import {MetadataService} from '../../services/metadata.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {StateService} from '../property-editor/state.service';
import * as _ from 'lodash';
import {IVFormComponent} from '../../services/IVFormComponent';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';
import {PropertyEditorComponent} from '../property-editor/property-editor.component';

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html'
})
export class FormEditorComponent implements AfterViewInit, IVFormContainerComponent {
  removed: EventEmitter<VFormComponent>;
  editedComponent: IVFormComponent;

  components: VFormComponent[];
  metadata: VFormComponent = new VFormComponent('Form', '', 'FormComponent');
  children: IVFormComponent[] = [];

  @ViewChild('container', { read: ViewContainerRef }) container: any;
  @ViewChild('pe') propertyEditor: PropertyEditorComponent;
  private isViewInitialized = false;
  form: FormGroup;

  constructor(private metadataService: MetadataService, private resolver: ComponentFactoryResolver, private fb: FormBuilder,
              public stateService: StateService, private self: ChangeDetectorRef) {
    this.components = metadataService.components();
    this.form = this.fb.group({});
    stateService.editorLaunched.subscribe(instance => {
      this.editedComponent = instance;
      this.showEditor(instance);
    });
    stateService.componentDeleted.subscribe(instance => this.deleteMatching(<IVFormComponent> this, instance));
  }

  private showEditor(instance: IVFormComponent) {
    this.propertyEditor.componentInstance = instance;
    this.propertyEditor.show();
  }

  remove(): void {
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
    DragHelper.drop(this, $event, null, this.metadataService, this.resolver);
  }

  toggleEditor() {
    this.stateService.toggle();
  }

  getJson() {
    const getMetadata = (c: IVFormComponent) => {
      const m = _.cloneDeep(c.metadata);
      _.forEach(c.children, child => m.children.push(getMetadata(child)));
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
}
