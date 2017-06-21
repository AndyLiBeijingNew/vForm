import {Component, Inject, Input, Optional, ViewChild} from '@angular/core';
import {Kv} from '../../services/Kv';
import {StateService} from './state.service';
import {IVFormComponent} from '../../services/IVFormComponent';
import {MD_DIALOG_DATA, MdDialog, MdInputDirective} from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'vform-property-editor',
  templateUrl: './property-editor.component.html'
})
export class PropertyEditorComponent {
  @Input()
  componentInstance: IVFormComponent;

  @ViewChild('newPropertyName') newPropertyName: MdInputDirective;
  @ViewChild('newPropertyValue') newPropertyValue: MdInputDirective;

  model: Kv[] = [];

  setProperty(key, value) {
    this.componentInstance.metadata.properties[key] = value;
    this.stateService.changeProperty(this.componentInstance, key, value);
  }

  delete() {
    this.stateService.deleteComponent(this.componentInstance);
    this.dialog.closeAll();
  }

  addProperty() {
    const name = (<any>this.newPropertyName).nativeElement.value.trim();
    const value = ((<any>this.newPropertyValue).nativeElement.value || '').trim();
    this.model.push(new Kv(name, value));
    this.componentInstance.metadata.properties[name] = value;
    this.stateService.changeProperty(this.componentInstance, name, value);
  }

  constructor(private stateService: StateService, private dialog: MdDialog, @Optional() @Inject(MD_DIALOG_DATA) data) {
    this.componentInstance = data;
    this.model = _.sortBy(Kv.from(this.componentInstance.metadata.properties), i => i.k);
  }
}
