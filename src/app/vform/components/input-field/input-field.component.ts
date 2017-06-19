import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormControl, FormGroup} from '@angular/forms';
import {VFormMetadata} from '../../services/VFormMetadata';
import {StateService} from '../../editors/property-editor/state.service';

@Component({
  selector: 'vform-input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent implements OnInit, IVFormComponent {
  @Input()
  form: FormGroup;

  @Input()
  public metadata: VFormMetadata;

  @Input()
  set value(value: string) {
    if (this.formControl) {
      this.formControl.patchValue(value);
    }
  }

  @Output()
  valueChanged: EventEmitter<string> = new EventEmitter();

  private formControl: FormControl;

  properties: any = {};
  private oldName;
  constructor(private stateService: StateService) {
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
    this.formControl.valueChanges.subscribe(v => this.valueChanged.emit(v));
    return this.formControl;
  }
}
