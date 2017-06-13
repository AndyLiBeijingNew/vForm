import {
  AfterViewInit, Component, ComponentRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Kv} from '../../services/Kv';
import {ModalDirective} from 'ngx-bootstrap';
import {ToggleEditorService} from './toggle-editor.service';

@Component({
  selector: 'property-editor',
  templateUrl: './property-editor.component.html',
  host: {'[hidden]': '!visible'}
})
export class PropertyEditorComponent {
  @Output()
  deleted: EventEmitter<any> = new EventEmitter();

  @Input()
  visible: boolean;

  @Input()
  properties: any;

  @Output()
  propertiesChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('staticModal')
  staticModal: ModalDirective;
  model: Kv[] = [];

  constructor(private toggleEditor: ToggleEditorService) {
    this.visible = this.toggleEditor.visible;
    this.toggleEditor.visibilityChanged.subscribe(v => this.visible = v);
  }

  save(): void {
    this.propertiesChange.emit(this.properties);
  }

  show() {
    this.model = Kv.from(this.properties);
    this.staticModal.show();
  }

  setProperty(key, value) {
    this.properties[key] = value;
  }

  delete() {
    this.deleted.emit();
  }
}
