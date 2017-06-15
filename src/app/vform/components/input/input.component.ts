import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {VFormMetadata} from '../../services/VFormMetadata';
import {FormArray, FormControl, FormControlName, FormGroup, Validator, Validators} from '@angular/forms';
import {Kv} from '../../services/Kv';
import {StateService} from '../../editors/property-editor/state.service';

@Component({
  selector: 'vform-input',
  templateUrl: './input.component.html',
  host: {
    '[class]': 'metadata.properties.containerClass', '[style.padding]': 'metadata.properties.containerPadding',
    '[style.width]': 'metadata.properties.containerWidth',
    '[style.height]': 'metadata.properties.containerHeight', '[style.display]': '"flex"', '[style.flexWrap]': '"wrap"'
  }
})
export class InputComponent implements OnInit, IVFormComponent {
  @Input()
  form: FormGroup;

  @Input()
  public metadata: VFormMetadata;

  properties: any = {};
  private oldName;
  constructor(private stateService: StateService) {
    stateService.propertyChanged.subscribe(tuple => {
      if (tuple[0] === this && tuple[1] === 'name') {
        this.nameChanged(tuple[2]);
      }
    });
  }

  ngOnInit() {
    this.oldName = this.metadata.properties.name;
    this.form.addControl(this.oldName, this.createControl());
  }

  remove(): void {
    if (this.form.contains(this.oldName)) {
      this.form.removeControl(this.oldName);
    }
  }

  nameChanged(value: any) {
      this.form.removeControl(this.oldName);
      this.oldName = value;
      this.form.addControl(value, this.createControl());
  }

  createControl() {
    return new FormControl('', Validators.required);
  }
}
