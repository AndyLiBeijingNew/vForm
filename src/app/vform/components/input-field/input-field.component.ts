import {Component, OnInit} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {HelperService} from '../../editors/property-editor/helper.service';
import {InputFieldBase} from './InputFieldBase';

@Component({
  selector: 'vform-input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent extends InputFieldBase implements IVFormComponent {
  constructor(stateService: HelperService) {
    super(stateService);
  }
}
