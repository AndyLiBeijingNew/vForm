import {EventEmitter} from '@angular/core';
export interface IRemovable {
  removed: EventEmitter<any>;
  remove(): void;
}
