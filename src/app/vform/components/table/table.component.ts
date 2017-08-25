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
import {HelperService} from '../../editors/property-editor/helper.service';
import {Helper} from '../../helpers/Helper';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {VFormMetadata} from '../../services/VFormMetadata';
import * as _ from 'lodash';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormComponent} from '../form/form.component';

@Component({
  selector: 'vform-table',
  templateUrl: './table.component.html',
  host: { '[style.width]': 'metadata.properties.width', '[style.height]': 'metadata.properties.height',
    '[style.padding]': 'metadata.properties.padding', '[class]': 'metadata.properties.containerClass'
  }
})
export class TableComponent extends FormArray implements IVFormComponent, OnInit {
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

  ngOnInit(): void {
    this.form.addControl(this.metadata.properties.name, this);
    this.oldName = this.metadata.properties.name;
    var iniRowNum = 1;
    if (this.metadata.properties.initialRows)
      {
        iniRowNum = this.metadata.properties.initialRows;
      }
    this.ensureRows(iniRowNum);
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

  automaticallyAddRow(changedRow: number) {
    if (this.metadata.properties.automaticallyAddRow && changedRow + 1 >= this.length) {
      this.insertRow();
    }
  }

  insertRow() {
    this.insert(this.length, new FormGroup({}));
  }

  removeRow(index: number) {
    this.removeAt(index);
  }
}
