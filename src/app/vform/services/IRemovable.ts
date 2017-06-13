import {EventEmitter} from '@angular/core';
import {VFormComponent} from './VFormComponent';
export interface IVFormComponent {
  metadata: VFormComponent;
  removed: EventEmitter<VFormComponent>;
  remove(): void;
}
