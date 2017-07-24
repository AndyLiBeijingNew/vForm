import {Component} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {HelperService} from '../../editors/property-editor/helper.service';
import {InputFieldBase} from '../input-field/InputFieldBase';

@Component({
  selector: 'vform-textarea',
  templateUrl: './text-area.component.html',
  host: {
    '[class]': 'metadata.properties.containerClass', '[style.padding]': 'metadata.properties.containerPadding',
    '[style.width]': 'metadata.properties.containerWidth',
    '[style.height]': 'metadata.properties.containerHeight',
    '[hidden]': 'isHidden()'
  }
})
export class TextAreaComponent extends InputFieldBase implements IVFormComponent {
  constructor(stateService: HelperService) {
    super(stateService);
  }
}
