import { Component, OnInit } from '@angular/core';
import {VFormComponentBase} from '../VFormComponentBase';
import {HelperService} from '../../editors/property-editor/helper.service';
import { LabelComponent } from "./label.component";
import { IListItem } from "../IListItem";
@Component({
  selector: 'vform-incremental-label',
  templateUrl: './incremental-label.component.html'
})
export class IncrementalLabelComponent extends LabelComponent implements OnInit, IListItem {

  itemIndex: number = 1;

  constructor(helperService: HelperService) 
  {
    super(helperService);
  }
  
  ngOnInit() {
      
  }
  
}
