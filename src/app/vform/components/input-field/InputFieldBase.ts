import {FormControl, FormGroup} from '@angular/forms';
import {HelperService} from '../../editors/property-editor/helper.service';
import {expressionValidator} from '../../validators/ExpressionValidator';
import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VFormMetadata} from '../../services/VFormMetadata';
import {IVFormComponent} from '../../services/IVFormComponent';
import {VFormComponentBase} from '../VFormComponentBase';
export abstract class InputFieldBase extends VFormComponentBase implements IVFormComponent, OnInit {
  @Input()
  set value(value: string) {
    if (this.formControl) {
      this.formControl.patchValue(value, {emitModelToViewChange: true, emitViewToModelChange: true, emitEvent: true});
    }
  }

  get value() {
    return this.formControl ? this.formControl.value : null;
  }

  @Output()
  valueChanged: EventEmitter<string> = new EventEmitter();

  private formControl: FormControl;
  private oldName;

  constructor(stateService: HelperService) {
    super(stateService);
    stateService.propertyChanged.subscribe(tuple => {
      if (tuple[0] === this && tuple[1] === 'name') {
        this.nameChanged(tuple[2]);
      }
    });
  }

  ngOnInit() {
    this.oldName = this.metadata.properties.name;
    this.form.addControl(this.oldName, this.createControl());
  }

  remove(): void {
    if (this.form.contains(this.oldName)) {
      this.form.removeControl(this.oldName);
    }
  }

  nameChanged(value: any) {
    this.form.removeControl(this.oldName);
    this.oldName = value;
    this.form.addControl(value, this.createControl());
  }

  createControl(value: string = '') {
    this.formControl = new FormControl(value);
    if (this.metadata.properties.vformValidatorExpression && this.metadata.properties.vformValidatorMessage) {
      this.formControl.setValidators(expressionValidator(this.form, this.metadata.properties.vformValidatorExpression,
        this.metadata.properties.vformValidatorMessage));
    }
    this.formControl.valueChanges.subscribe(v => this.valueChanged.emit(v));
    return this.formControl;
  }
}
