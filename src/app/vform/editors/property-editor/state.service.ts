import {EventEmitter, Injectable} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
@Injectable()
export class StateService {
  editorHandleIsVisible = true;
  editorLaunched: EventEmitter<IVFormComponent> = new EventEmitter<IVFormComponent>();
  propertyChanged: EventEmitter<[IVFormComponent, string, any]> = new EventEmitter<[IVFormComponent, string, any]>();
  visibilityChanged = new EventEmitter<Boolean>();
  componentDeleted: EventEmitter<IVFormComponent> = new EventEmitter<IVFormComponent>();

  setEditorHandleVisibility(value: boolean) {
    this.editorHandleIsVisible = value;
    this.visibilityChanged.emit(this.editorHandleIsVisible);
  }

  deleteComponent(instance: IVFormComponent) {
    this.componentDeleted.emit(instance);
  }

  edit(component: IVFormComponent) {
    this.editorLaunched.emit(component);
  }

  changeProperty(instance: IVFormComponent, key: string, value: any) {
    this.propertyChanged.emit([instance, key, value]);
  }
}
