import {Component, Input} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {VFormMetadata} from '../../services/VFormMetadata';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {StateService} from '../../editors/property-editor/state.service';

@Component({
  selector: 'vform-html',
  templateUrl: './html.component.html'
})
export class HtmlComponent implements IVFormComponent {
  @Input()
  properties = {};

  @Input()
  form: FormGroup;

  @Input()
  public metadata: VFormMetadata;

  constructor(private sanitizer: DomSanitizer, private stateService: StateService) {
  }
}
