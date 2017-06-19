import {
  ChangeDetectorRef,
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {StateService} from '../../editors/property-editor/state.service';
import {VFormMetadata} from '../../services/VFormMetadata';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';
import * as _ from 'lodash';
import {DragHelper} from '../../editors/Helper';

@Component({
  selector: 'vform-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements IVFormContainerComponent {
  @ViewChild('container',  { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  children: IVFormComponent[] = [];

  @Output()
  valueChanged: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  statusChanged: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  private _metadata: VFormMetadata = new VFormMetadata('', '', '');

  @Input()
  set metadata(value: VFormMetadata) {
    this.container.clear();
    this._metadata = value;
    _.forEach(this.metadata.children, c =>  DragHelper.createComponent(this, c, this.resolver));
  }

  @Input()
  setData(value: any) {
    this.form.patchValue(value);
  }

  get metadata(): VFormMetadata {
    return this._metadata;
  }

  constructor(private stateService: StateService, private fb: FormBuilder, private resolver: ComponentFactoryResolver, cdRef: ChangeDetectorRef) {
    stateService.setEditorHandleVisibility(false);
    this.form = fb.group({});
    this.form.valueChanges.subscribe(v => this.valueChanged.emit(v));
    this.form.statusChanges.subscribe(v => this.statusChanged.emit(v));
  }
}
