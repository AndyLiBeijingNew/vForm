import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {VFormComponent} from '../../services/VFormComponent';
import {FormArray, FormControl, FormControlName, FormGroup, Validator, Validators} from '@angular/forms';
import {Kv} from '../../services/Kv';

@Component({
  selector: 'vform-input',
  templateUrl: './input.component.html',
  host: {
    '[class]': 'metadata.properties.containerClass', '[style.padding]': 'metadata.properties.containerPadding',
    '[style.width]': 'metadata.properties.containerWidth',
    '[style.height]': 'metadata.properties.containerHeight'
  }
})
export class InputComponent implements OnInit, IVFormComponent {
  @Output()
  removed: EventEmitter<VFormComponent> = new EventEmitter<VFormComponent>();

  @Input()
  form: FormGroup;

  @Input()
  public metadata: VFormComponent;

  properties: any = {};
  private oldName;
  constructor() { }

  ngOnInit() {
    this.oldName = this.metadata.properties.name;
    this.form.addControl(this.oldName, this.createControl());
  }

  remove(): void {
    if (this.form.contains(this.oldName)) {
      this.form.removeControl(this.oldName);
    }
    this.removed.next(this.metadata);
  }

  nameChanged(kv: Kv) {
    if (kv && kv.k === 'name') {
      this.form.removeControl(this.oldName);
      this.oldName = kv.v;
      this.form.addControl(kv.v, this.createControl());
    }
  }

  createControl() {
    return new FormControl();
  }
}
