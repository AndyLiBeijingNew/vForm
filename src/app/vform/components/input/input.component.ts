import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {VFormMetadata} from '../../services/VFormMetadata';
import {FormArray, FormControl, FormControlName, FormGroup, Validator, Validators} from '@angular/forms';
import {Kv} from '../../services/Kv';
import {StateService} from '../../editors/property-editor/state.service';
import {InputFieldComponent} from '../input-field/input-field.component';

@Component({
  selector: 'vform-input',
  templateUrl: './input.component.html',
  host: {
    '[class]': 'metadata.properties.containerClass', '[style.padding]': 'metadata.properties.containerPadding',
    '[style.width]': 'metadata.properties.containerWidth',
    '[style.height]': 'metadata.properties.containerHeight', '[style.display]': '"flex"', '[style.flexWrap]': '"wrap"'
  }
})
export class InputComponent implements IVFormComponent {
  @ViewChild('field')
  field: InputFieldComponent;

  @Input()
  form: FormGroup;

  @Input()
  public metadata: VFormMetadata;

  @Input()
  set value(value: string) {
    this.field.inValue = value;
  }

  properties: any = {};
  private oldName;
  constructor(private stateService: StateService) {
  }

  remove(): void {
    if (this.form.contains(this.oldName)) {
      this.form.removeControl(this.oldName);
    }
  }
}
