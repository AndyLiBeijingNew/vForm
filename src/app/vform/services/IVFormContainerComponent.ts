import {ViewContainerRef} from '@angular/core';
import {IVFormComponent} from './IVFormComponent';
export interface IVFormContainerComponent extends IVFormComponent {
  container: ViewContainerRef;
}
