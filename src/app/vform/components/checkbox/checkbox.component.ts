import {Component} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {HelperService} from '../../editors/property-editor/helper.service';
import {InputFieldBase} from '../input-field/InputFieldBase';
import { VFormComponentBase } from "../VFormComponentBase";
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'vform-checkbox',
  templateUrl: './checkbox.component.html',
  host: {
    '[style.containerPadding]': 'metadata.properties.padding',
    '[style.alignItems]': 'metadata.properties.alignItems',
    '[style.justifyContent]': 'metadata.properties.justifyContent',
    '[style.flexFlow]': 'metadata.properties.flexFlow',
    '[class]': 'metadata.properties.class',
    '[hidden]': 'isHidden()'
  }
})
export class CheckboxComponent extends InputFieldBase implements IVFormComponent {

  constructor(stateService: HelperService, private sanitizer: DomSanitizer) {
    super(stateService);
  }

}
