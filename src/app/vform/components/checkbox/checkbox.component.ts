import {Component} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {HelperService} from '../../editors/property-editor/helper.service';
import {InputFieldBase} from '../input-field/InputFieldBase';
import { VFormComponentBase } from "../VFormComponentBase";
@Component({
  selector: 'vform-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent extends InputFieldBase implements IVFormComponent {

  constructor(stateService: HelperService) {
    super(stateService);
  }

}
