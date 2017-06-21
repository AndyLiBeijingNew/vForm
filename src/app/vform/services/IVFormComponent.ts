import {ComponentRef} from '@angular/core';
import {VFormMetadata} from './VFormMetadata';
import {FormGroup} from '@angular/forms';
export interface IVFormComponent {
  children?: IVFormComponent[];
  componentRef?: ComponentRef<any>;
  form: FormGroup;
  metadata: VFormMetadata;
}
