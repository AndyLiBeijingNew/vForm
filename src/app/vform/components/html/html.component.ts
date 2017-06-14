import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {VFormComponent} from '../../services/VFormComponent';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

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
  form: FormGroup;

  @Input()
  public metadata: VFormComponent;

  remove(): void {
    this.removed.next(this.metadata);
  }

  constructor(private sanitizer: DomSanitizer) { }
}
