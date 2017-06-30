import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, ComponentRef,
  forwardRef,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {VFormComponentBase} from '../VFormComponentBase';
import {StateService} from '../../editors/property-editor/state.service';
import {Helper} from '../../helpers/Helper';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {VFormMetadata} from '../../services/VFormMetadata';
import * as _ from 'lodash';
import {IVFormComponent} from '../../services/IVFormComponent';

@Component({
  selector: 'vform-table',
  templateUrl: './table.component.html',
  host: { '[style.width]': 'metadata.properties.width', '[style.height]': 'metadata.properties.height',
    '[style.padding]': 'metadata.properties.padding'
  }
})
export class TableComponent extends FormArray implements IVFormComponent, OnInit {
  children: IVFormComponent[];
  componentRef: ComponentRef<any>;
  form: FormGroup;
  metadata: VFormMetadata;
  oldName: string;

  constructor(private stateService: StateService) {
    super([]);
    stateService.propertyChanged.subscribe(tuple => {
      if (tuple[0] === this && tuple[1] === 'name') {
        this.nameChanged(tuple[2]);
      }
    });
  }

  ngOnInit(): void {
    this.form.addControl(this.metadata.properties.name, this);
    this.oldName = this.metadata.properties.name;
    this.ensureRows(1);
  }

  private getEmptyRowData() {
    const r: any = {};
    _.forEach(this.metadata.properties.columns, c => r[c.name] = null);
    return r;
  }

  setValue(value: any, options?: any): void {
    this.ensureRows(value ? value.length : 1);
    super.setValue(value, {emitEvent: true});
  }

  patchValue(value: any, options?: any): void {
    this.ensureRows(value ? value.length : 1);
    super.patchValue(value, {emitEvent: true});
  }


  trackByIndex(index: number, obj: any) {
    return index;
  }

  nameChanged(newName: any) {
    if (this.oldName) {
      this.form.removeControl(this.oldName);
    }
    this.form.addControl(newName, this);
  }

  ensureRows(n: number) {
    if (this.length > n && n > 0 ) {
      _.times(this.length - n, (i) => this.removeAt(0));
    } else if (this.length < n) {
      _.times((n - this.length), (i) => this.insert(0, new FormGroup({})));
    }
  }

  insertRow() {
    this.insert(this.length, new FormGroup({}));
  }

  removeRow(index: number) {
    this.removeAt(index);
  }
}
