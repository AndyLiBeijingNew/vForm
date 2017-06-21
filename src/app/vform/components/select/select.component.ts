import {Component, ComponentRef, OnInit} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {VFormMetadata} from 'app/vform/services/VFormMetadata';
import {InputFieldBase} from '../input-field/InputFieldBase';
import {StateService} from '../../editors/property-editor/state.service';
import * as _ from 'lodash';

@Component({
  selector: 'vform-select',
  templateUrl: './select.component.html',
  host: {
    '[class]': 'metadata.properties.containerClass', '[style.padding]': 'metadata.properties.containerPadding',
    '[style.width]': 'metadata.properties.containerWidth',
    '[style.height]': 'metadata.properties.containerHeight'
  }
})
export class SelectComponent extends InputFieldBase implements IVFormComponent, OnInit {
  children: IVFormComponent[];
  componentRef: ComponentRef<any>;
  form: FormGroup;
  metadata: VFormMetadata;

  options: any[];

  constructor(stateService: StateService) {
    super(stateService);
    stateService.propertyChanged.subscribe(tuple => {
      if (tuple[0] === this && tuple[2] === 'options') {
        this.options =  <any[]> _.attempt(JSON.parse.bind(null, tuple[3]));
      }
    });
  }

  ngOnInit() {
    this.options = <any[]> _.attempt(JSON.parse.bind(null, this.metadata.properties.options));
    super.ngOnInit();
  }
}