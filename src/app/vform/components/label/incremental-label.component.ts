import { Component, OnInit } from '@angular/core';
import {VFormComponentBase} from '../VFormComponentBase';
import {HelperService} from '../../editors/property-editor/helper.service';
import { LabelComponent } from './label.component';
import { IListItemIndex } from '../IListItemIndex';
@Component({
  selector: 'vform-incremental-label',
  templateUrl: './incremental-label.component.html'
})
export class IncrementalLabelComponent extends LabelComponent implements OnInit {

  itemIndex: IListItemIndex;

  constructor(helperService: HelperService) {
    super(helperService);
  }

  ngOnInit() {

  }

  setItemIndex(value : IListItemIndex)
  {
    this.itemIndex = value;
  }
}
