import {Component} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {StateService} from '../../editors/property-editor/state.service';
import { VFormComponentBase } from "../VFormComponentBase";
@Component({
  selector: 'vform-submit-btn',
  templateUrl: './button.component.html'
})
export class SubmitBtnComponent extends VFormComponentBase implements IVFormComponent {
  constructor(stateService: StateService) {
    super(stateService);
  }
  
}
