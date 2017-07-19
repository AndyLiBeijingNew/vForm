import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {HelperService} from '../../editors/property-editor/helper.service';
import {VFormMetadata} from '../../services/VFormMetadata';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';
import * as _ from 'lodash';
import {Helper} from '../../helpers/Helper';
import {VFormComponentBase} from '../VFormComponentBase';
import {IVFormContext} from "app/vform/interfaces/IVFormContext";

@Component({
  selector: 'vform-form',
  templateUrl: './form.component.html'
})
export class FormComponent extends FormGroup implements IVFormContainerComponent {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  form: FormComponent;
  children?: IVFormComponent[] = [];

  @Input()
  context: IVFormContext = {patient: {}};

  @Output()
  valueChanged: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  statusChanged: EventEmitter<any> = new EventEmitter<any>();

  private _metadata: VFormMetadata = new VFormMetadata('Form', '', 'FormComponent');

  @Input()
  set metadata(value: VFormMetadata) {
    this.container.clear();
    this._metadata = value;
    _.forEach(this.metadata.children, c => Helper.createComponent(this, c, this.resolver));
  }

  @Input()
  setData(value: any) {
    this.form.patchValue(value);
  }

  get metadata(): VFormMetadata {
    return this._metadata;
  }

  constructor(private stateService: HelperService, private fb: FormBuilder, private resolver: ComponentFactoryResolver) {
    super({});
    stateService.setEditorHandleVisibility(false);
    this.form = this;
    this.form.valueChanges.subscribe(v => this.valueChanged.emit(v));
    this.form.statusChanges.subscribe(v => this.statusChanged.emit(v));
  }
}
