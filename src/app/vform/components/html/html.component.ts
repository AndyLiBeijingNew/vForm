import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {IVFormComponent} from '../../services/IRemovable';
import {VFormComponent} from '../../services/VFormComponent';

@Component({
  selector: 'vform-html',
  templateUrl: './html.component.html'
})
export class HtmlComponent implements IVFormComponent {
  @Input()
  properties = {};

  @Output()
  removed: EventEmitter<VFormComponent> = new EventEmitter<VFormComponent>();


  @Input()
  public metadata: VFormComponent;

  remove(): void {
    this.removed.next(this.metadata);
  }

  constructor() { }
}
