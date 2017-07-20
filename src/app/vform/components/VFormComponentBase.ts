import {HelperService} from '../editors/property-editor/helper.service';
import {FormGroup} from '@angular/forms';
import {IVFormComponent} from '../services/IVFormComponent';
import {ComponentRef, Input} from '@angular/core';
import {VFormMetadata} from '../services/VFormMetadata';
import {Helper} from '../helpers/Helper';
import {FormComponent} from "./form/form.component";
export abstract class VFormComponentBase implements IVFormComponent {
  children: IVFormComponent[] = [];
  componentRef: ComponentRef<any>;

  @Input()
  form: FormComponent;

  @Input()
  metadata: VFormMetadata;

  constructor(protected helperService: HelperService) {
  }

  isHidden(): boolean {
    return Helper.formExpression(this.form, this.metadata.properties.hidden);
  }

  isRequired(): boolean {
    return Helper.formExpression(this.form, this.metadata.properties.required);
  }
}
