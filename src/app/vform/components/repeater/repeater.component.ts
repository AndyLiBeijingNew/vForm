import {Component, ComponentRef, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {IVFormComponent} from '../../services/IVFormComponent';
import {VFormMetadata} from '../../services/VFormMetadata';
import {FormComponent} from '../form/form.component';
import {HelperService} from '../../editors/property-editor/helper.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-repeater',
  templateUrl: './repeater.component.html',
  host: { '[style.width]': 'metadata.properties.width', '[style.height]': 'metadata.properties.height',
    '[style.padding]': 'metadata.properties.padding'
  }
})
export class RepeaterComponent  extends FormArray implements IVFormComponent, OnInit {
  children: IVFormComponent[];
  componentRef: ComponentRef<any>;
  form: FormComponent;
  metadata: VFormMetadata;
  oldName: string;

  constructor(private helperService: HelperService) {
    super([]);
    helperService.propertyChanged.subscribe(tuple => {
      if (tuple[0] === this && tuple[1] === 'name') {
        this.nameChanged(tuple[2]);
      }
    });
  }

  nameChanged(newName: any) {
    if (this.oldName) {
      this.form.removeControl(this.oldName);
    }
    this.form.addControl(newName, this);
  }

  ngOnInit() {
    this.form.addControl(this.metadata.properties.name, this);
    this.oldName = this.metadata.properties.name;
    var initialTables = 1;
    if(this.metadata.properties.initialTables)
      {
        initialTables = this.metadata.properties.initialTables;
      }
    this.ensureData(initialTables);
  }

  ensureData(n: number) {
    if (this.length > n && n > 0 ) {
      _.times(this.length - n, (i) => this.removeAt(0));
    } else if (this.length < n) {
      _.times((n - this.length), (i) => this.insert(0, new FormGroup({})));
    }
  }

  setValue(value: any, options?: any): void {
    this.ensureData(value ? value.length : 1);
    super.setValue(value, {emitEvent: true});
  }

  patchValue(value: any, options?: any): void {
    this.ensureData(value ? value.length : 1);
    super.patchValue(value, {emitEvent: true});
  }

  repeatRow() {
    this.insert(this.length, new FormGroup({}));
  }
}
