import {Component} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {HelperService} from '../../editors/property-editor/helper.service';
import { VFormComponentBase } from '../VFormComponentBase';
@Component({
  selector: 'vform-submit-btn',
  templateUrl: './button.component.html'
})
export class SubmitBtnComponent extends VFormComponentBase implements IVFormComponent {
  constructor(stateService: HelperService) {
    super(stateService);
  }
}
