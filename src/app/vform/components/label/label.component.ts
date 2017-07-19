import { Component, OnInit } from '@angular/core';
import {VFormComponentBase} from '../VFormComponentBase';
import {HelperService} from '../../editors/property-editor/helper.service';

@Component({
  selector: 'vform-label',
  templateUrl: './label.component.html'
})
export class LabelComponent extends VFormComponentBase {

  constructor(helperService: HelperService) {
    super(helperService);
  }
}
