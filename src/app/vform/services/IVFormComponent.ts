import {EventEmitter} from '@angular/core';
import {VFormComponent} from './VFormComponent';
import {FormGroup} from '@angular/forms';
export interface IVFormComponent {
  form: FormGroup;
  metadata: VFormComponent;
  removed: EventEmitter<VFormComponent>;
  remove(): void;
}
