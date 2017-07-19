import {ComponentRef} from '@angular/core';
import {VFormMetadata} from './VFormMetadata';
import {FormGroup} from '@angular/forms';
import {FormComponent} from "../components/form/form.component";
export interface IVFormComponent {
  children?: IVFormComponent[];
  componentRef?: ComponentRef<any>;
  form: FormComponent;
  metadata: VFormMetadata;
}
