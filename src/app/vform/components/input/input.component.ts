import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IRemovable} from '../../services/IRemovable';

@Component({
  selector: 'vform-input',
  templateUrl: './input.component.html',
  host: {
    '[class]': 'properties.containerClass', '[style.padding]': 'properties.containerPadding', '[style.width]': 'properties.containerWidth',
    '[style.height]': 'properties.containerHeight'
  }
})
export class InputComponent implements OnInit, IRemovable {
  @Output()
  removed: EventEmitter<any> = new EventEmitter<any>();

  properties: any = {};
  constructor() { }

  ngOnInit() {
  }

  remove(): void {
    this.removed.next(this.properties);
  }
}
