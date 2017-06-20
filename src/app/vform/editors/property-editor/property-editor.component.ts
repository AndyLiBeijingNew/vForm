import {
  AfterViewInit, Component, ComponentRef, EventEmitter, Inject, Input, OnChanges, OnInit, Optional, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Kv} from '../../services/Kv';
import {StateService} from './state.service';
import {IVFormComponent} from '../../services/IVFormComponent';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'vform-property-editor',
  templateUrl: './property-editor.component.html'
})
export class PropertyEditorComponent {
  @Input()
  componentInstance: IVFormComponent;

  model: Kv[] = [];

  setProperty(key, value) {
    this.componentInstance.metadata.properties[key] = value;
    this.stateService.changeProperty(this.componentInstance, key, value);
  }

  delete() {
    this.stateService.deleteComponent(this.componentInstance);
    this.dialog.closeAll();
  }

  constructor(private stateService: StateService, private dialog: MdDialog, @Optional() @Inject(MD_DIALOG_DATA) data) {
    this.componentInstance = data;
    this.model = Kv.from(this.componentInstance.metadata.properties);
  }
}
