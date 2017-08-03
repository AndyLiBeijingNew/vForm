import { Component, OnInit } from '@angular/core';
import {MetadataService} from '../../services/metadata.service';
import {HelperService} from '../property-editor/helper.service';

@Component({
  selector: 'vform-selected-component',
  templateUrl: './selected-component.component.html'
})
export class SelectedComponentComponent implements OnInit {

  constructor(private helperService: HelperService) {
  }

  ngOnInit() {
  }
}
