import {Component} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {StateService} from '../../editors/property-editor/state.service';
import {InputFieldBase} from '../input-field/InputFieldBase';
import { VFormComponentBase } from "../VFormComponentBase";
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends InputFieldBase implements IVFormComponent{

  constructor(stateService: StateService) {
    super(stateService);
  }

}
