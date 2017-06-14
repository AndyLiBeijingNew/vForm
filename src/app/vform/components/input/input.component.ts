import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {VFormComponent} from '../../services/VFormComponent';
import {FormArray, FormControl, FormControlName, FormGroup, Validator, Validators} from '@angular/forms';

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
  private formControl: FormControl;
  constructor() { }

  ngOnInit() {
    this.formControl = new FormControl('');
    this.form.addControl(this.metadata.properties.name, this.formControl);
  }

  remove(): void {
    this.form.removeControl(this.properties.name);
    this.removed.next(this.metadata);
  }
}
