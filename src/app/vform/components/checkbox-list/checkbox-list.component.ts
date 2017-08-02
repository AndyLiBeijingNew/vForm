import { Component, OnInit } from '@angular/core';
import {VFormComponentBase} from '../VFormComponentBase';
import {HelperService} from '../../editors/property-editor/helper.service';
import * as _ from 'lodash';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'vform-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  host: {
  '[style.padding]': 'metadata.properties.padding',
  '[style.alignItems]': 'metadata.properties.alignItems',
  '[style.alignSelf]': 'metadata.properties.alignSelf',
  '[style.justifyContent]': 'metadata.properties.justifyContent',
  '[style.flexFlow]': 'metadata.properties.flexFlow',
  '[class]': 'metadata.properties.class'
  }
})
export class CheckboxListComponent extends VFormComponentBase implements OnInit {
  checkboxes: any[];

  constructor(helperService: HelperService, private sanitizer: DomSanitizer) {
    super(helperService);
    helperService.propertyChanged.subscribe(tuple => {
      if (tuple[0] === this && tuple[1] === 'checkboxes') {
        this.checkboxes = <any[]> _.attempt(JSON.parse.bind(null, this.metadata.properties.checkboxes));
      }
    });
  }

  ngOnInit() {
    this.checkboxes = <any[]> _.attempt(JSON.parse.bind(null, this.metadata.properties.checkboxes));
  }
}
