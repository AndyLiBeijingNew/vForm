import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVFormComponent} from '../../services/IRemovable';
import {VFormComponent} from '../../services/VFormComponent';

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
  public metadata: VFormComponent;

  properties: any = {};
  constructor() { }

  ngOnInit() {
  }

  remove(): void {
    this.removed.next(this.metadata);
  }
}
