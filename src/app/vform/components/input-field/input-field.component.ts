import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormControl, FormGroup} from '@angular/forms';
import {VFormMetadata} from '../../services/VFormMetadata';
import {StateService} from '../../editors/property-editor/state.service';
import {expressionValidator} from '../../validators/ExpressionValidator';
import {InputFieldBase} from './InputFieldBase';

@Component({
  selector: 'vform-input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent extends InputFieldBase implements OnInit, IVFormComponent {
  constructor(stateService: StateService) {
    super(stateService);
  }
}
