import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VFormMetadata} from '../../services/VFormMetadata';
import {FormGroup} from '@angular/forms';

@Component({
  selector: '[vform-tr]',
  templateUrl: './table-row.component.html'
})
export class TableRowComponent implements OnInit {
  @Input()
  columns: any[];

  @Input()
  form: FormGroup;

  @Input()
  showActions: boolean;

  @Input()
  rowNum: number;

  @Output()
  deleted: EventEmitter<FormGroup> = new EventEmitter();

  @Output()
  changed: EventEmitter<any> = new EventEmitter();

  constructor() { }

  removeRow() {
    this.deleted.emit(this.form);
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(v => {
      if (!this.form.pristine) {
        this.changed.emit(null);
      }
    });
  }
}
