import {Component, Inject, Input, Optional, ViewChild} from '@angular/core';
import {Kv} from '../../services/Kv';
import {HelperService} from './helper.service';
import {IVFormComponent} from '../../services/IVFormComponent';
import {MD_DIALOG_DATA, MdDialog, MdInputDirective} from '@angular/material';
import * as _ from 'lodash';
import {MetadataService} from '../../services/metadata.service';
import {Helper} from '../../helpers/Helper';
import {isUndefined} from 'util';

@Component({
  selector: 'vform-property-editor',
  templateUrl: './property-editor.component.html'
})
export class PropertyEditorComponent {
  @Input()
  componentInstance: IVFormComponent;

  @ViewChild('newPropertyName') newPropertyName: MdInputDirective;
  @ViewChild('newPropertyValue') newPropertyValue: MdInputDirective;

  keys = (o: object) => Object.keys(o).sort();

  setProperty(key, value) {
    Helper.setProperty(this.componentInstance.metadata.properties, key, value, true);
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
    this.componentInstance.metadata.properties[name] = value;
    this.stateService.changeProperty(this.componentInstance, name, value);
  }

  constructor(private metadataService: MetadataService, private stateService: HelperService,
              private dialog: MdDialog, @Optional() @Inject(MD_DIALOG_DATA) data) {
    this.componentInstance = data;
  }

  clearBorders(e: Event) {
    Helper.setBordersValues(e, this.componentInstance.metadata.properties,
      {borderTop: '', borderRight: '', borderBottom: '', borderLeft: ''});
  }

  setBorders(e: Event) {
    const bs = this.metadataService.defaultBorderSpecFor(this.componentInstance.metadata.type);
    Helper.setBordersValues(e, this.componentInstance.metadata.properties,
      {borderTop: bs, borderRight: bs, borderBottom: bs, borderLeft: bs});
  }

  setTopBorder(e: Event) {
    const bs = this.metadataService.defaultBorderSpecFor(this.componentInstance.metadata.type);
    Helper.setBordersValues(e, this.componentInstance.metadata.properties,
      {borderTop: bs, borderRight: '', borderBottom: '', borderLeft: ''});
  }

  setLeftBorder(e: Event) {
    const bs = this.metadataService.defaultBorderSpecFor(this.componentInstance.metadata.type);
    Helper.setBordersValues(e, this.componentInstance.metadata.properties,
      {borderTop: '', borderRight: '', borderBottom: '', borderLeft: bs});
  }

  setRightBorder(e: Event) {
    const bs = this.metadataService.defaultBorderSpecFor(this.componentInstance.metadata.type);
    Helper.setBordersValues(e, this.componentInstance.metadata.properties,
      {borderTop: '', borderRight: bs, borderBottom: '', borderLeft: ''});
  }

  setBottomBorder(e: Event) {
    const bs = this.metadataService.defaultBorderSpecFor(this.componentInstance.metadata.type);
    Helper.setBordersValues(e, this.componentInstance.metadata.properties,
      {borderTop: '', borderRight: '', borderBottom: bs, borderLeft: ''});
  }
}
