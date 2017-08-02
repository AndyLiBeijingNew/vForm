import {Component} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {HelperService} from '../../editors/property-editor/helper.service';
import {InputFieldBase} from '../input-field/InputFieldBase';
import { VFormComponentBase } from "../VFormComponentBase";
@Component({
  selector: 'vform-checkbox',
  templateUrl: './checkbox.component.html',
  host: {
    '[class]': 'metadata.properties.containerClass', '[style.padding]': 'metadata.properties.containerPadding',
    '[style.width]': 'metadata.properties.containerWidth',
    '[style.height]': 'metadata.properties.containerHeight',
    '[hidden]': 'isHidden()'
  }
})
export class CheckboxComponent extends InputFieldBase implements IVFormComponent {

  constructor(stateService: HelperService) {
    super(stateService);
  }

}
