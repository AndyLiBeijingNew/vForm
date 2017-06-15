import {ComponentRef, EventEmitter} from '@angular/core';
import {VFormComponent} from './VFormMetadata';
import {FormGroup} from '@angular/forms';
export interface IVFormComponent {
  children?: IVFormComponent[];
  componentRef?: ComponentRef<any>;
  form: FormGroup;
  metadata: VFormComponent;
  removed: EventEmitter<VFormComponent>;
  remove?(): void;
}
