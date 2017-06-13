import {EventEmitter, Injectable} from '@angular/core';
@Injectable()
export class ToggleEditorService {
  visible = true;
  visibilityChanged = new EventEmitter<Boolean>();
  toggle() {
    this.visible = !this.visible;
    this.visibilityChanged.emit(this.visible);
  }
}
