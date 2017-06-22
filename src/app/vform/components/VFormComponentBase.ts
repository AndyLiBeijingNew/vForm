import {StateService} from '../editors/property-editor/state.service';
import {FormGroup} from '@angular/forms';
import {IVFormComponent} from '../services/IVFormComponent';
import {ComponentRef, Input} from '@angular/core';
import {VFormMetadata} from '../services/VFormMetadata';
import {Helper} from '../helpers/Helper';
export abstract class VFormComponentBase implements IVFormComponent {
  children: IVFormComponent[] = [];
  componentRef: ComponentRef<any>;

  @Input()
  form: FormGroup;

  @Input()
  metadata: VFormMetadata;

  constructor(protected stateService: StateService) {
  }

  isHidden(): boolean {
    return Helper.formExpression(this.form, this.metadata.properties.hidden);
  }

  isRequired(): boolean {
    return Helper.formExpression(this.form, this.metadata.properties.required);
  }
}
