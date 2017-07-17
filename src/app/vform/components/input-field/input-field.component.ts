import {Component, OnInit} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {StateService} from '../../editors/property-editor/state.service';
import {InputFieldBase} from './InputFieldBase';

@Component({
  selector: 'vform-input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent extends InputFieldBase implements IVFormComponent {
  constructor(stateService: StateService) {
    super(stateService);
  }
}
