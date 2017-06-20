import {Component} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {StateService} from '../../editors/property-editor/state.service';
import {InputFieldBase} from '../input-field/InputFieldBase';

@Component({
  selector: 'vform-input',
  templateUrl: './input.component.html',
  host: {
    '[class]': 'metadata.properties.containerClass', '[style.padding]': 'metadata.properties.containerPadding',
    '[style.width]': 'metadata.properties.containerWidth',
    '[style.height]': 'metadata.properties.containerHeight'
  }
})
export class InputComponent extends InputFieldBase implements IVFormComponent {
  constructor(stateService: StateService) {
    super(stateService);
  }
}
