import {Component, Inject, Input, Optional, ViewChild} from '@angular/core';
import {Kv} from '../../services/Kv';
import {HelperService} from './helper.service';
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
    const nameNe = (<any>this.newPropertyName).nativeElement;
    const valueNe = (<any>this.newPropertyValue).nativeElement;
    const name = nameNe.value.trim();
    const value = (valueNe.value || '').trim();
    nameNe.value = null;
    valueNe.value = null;
    this.model.push(new Kv(name, value));
    this.componentInstance.metadata.properties[name] = value;
    this.stateService.changeProperty(this.componentInstance, name, value);
  }

  constructor(private stateService: HelperService, private dialog: MdDialog, @Optional() @Inject(MD_DIALOG_DATA) data) {
    this.componentInstance = data;
    this.model = _.sortBy(Kv.from(this.componentInstance.metadata.properties), i => i.k);
  }
}
