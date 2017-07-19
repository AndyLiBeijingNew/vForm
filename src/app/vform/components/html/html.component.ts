import {Component, Input} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {DomSanitizer} from '@angular/platform-browser';
import {HelperService} from '../../editors/property-editor/helper.service';
import {VFormComponentBase} from '../VFormComponentBase';

@Component({
  selector: 'vform-html',
  templateUrl: './html.component.html',
  host: { '[hidden]': 'isHidden()' }
})
export class HtmlComponent extends VFormComponentBase implements IVFormComponent {
  constructor(private sanitizer: DomSanitizer, stateService: HelperService) {
    super(stateService);
  }
}
