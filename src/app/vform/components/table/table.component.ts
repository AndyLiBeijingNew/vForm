import { Component, OnInit } from '@angular/core';
import {VFormComponentBase} from '../VFormComponentBase';
import {StateService} from '../../editors/property-editor/state.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent extends VFormComponentBase implements OnInit {

  constructor(stateService: StateService) {
    super(stateService);
  }

  ngOnInit() {
  }
}
