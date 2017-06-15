import {
  AfterViewInit, Component, ComponentRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Kv} from '../../services/Kv';
import {ModalDirective} from 'ngx-bootstrap';
import {StateService} from './state.service';
import {IVFormComponent} from '../../services/IVFormComponent';

@Component({
  selector: 'property-editor',
  templateUrl: './property-editor.component.html'
})
export class PropertyEditorComponent {
  @Input()
  componentInstance: IVFormComponent;

  @Output()
  propertiesChanged: EventEmitter<Kv> = new EventEmitter<Kv>();

  @ViewChild('staticModal')
  staticModal: ModalDirective;
  model: Kv[] = [];

  show() {
    this.model = Kv.from(this.componentInstance.metadata.properties);
    this.staticModal.show();
  }

  setProperty(key, value) {
    this.componentInstance.metadata.properties[key] = value;
    this.stateService.changeProperty(this.componentInstance, key, value);
  }

  delete() {
    this.stateService.deleteComponent(this.componentInstance);
  }

  constructor(private stateService: StateService) {
  }
}
