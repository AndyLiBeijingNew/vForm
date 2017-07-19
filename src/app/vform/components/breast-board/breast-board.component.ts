import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from '../../editors/property-editor/helper.service';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {VFormMetadata} from '../../services/VFormMetadata';
import {InputFieldComponent} from '../input-field/input-field.component';
import {VFormComponentBase} from '../VFormComponentBase';

@Component({
  selector: 'vform-breast-board',
  templateUrl: './breast-board.component.html',
  host: { '[hidden]': 'isHidden()' }
})
export class BreastBoardComponent extends VFormComponentBase implements OnInit, IVFormComponent {
  angleDataMetadata: VFormMetadata;

  angle = 5;

  @ViewChild('field')
  field: InputFieldComponent;

  setAngle(value: number) {
    this.field.value = value.toString();
    this.angle = value;
  }

  getAngle(value) {
    if (value) {
      const v = parseFloat(value);
      this.angle = v;
    }
  }

  getOverlayClass(): string {
    let c = 'breast-board-150-image';
    switch (this.angle) {
      case 7.5: {
        c = 'breast-board-75-image';
        break;
      }
      case 10: {
        c = 'breast-board-100-image';
        break;
      }
      case 12.5: {
        c = 'breast-board-125-image';
        break;
      }
      case 15: {
        c = 'breast-board-150-image';
        break;
      }
      default: {
        c = 'breast-board-50-image';
      }
    }
    ;
    return c;
  }

  constructor(stateService: HelperService, private cdRef: ChangeDetectorRef) {
    super(stateService);
  }

  ngOnInit(): void {
    this.angleDataMetadata = new VFormMetadata('Hidden', 'Text input.', 'InputComponent',
      {
        type: 'hidden',
        showLabel: 'false', containerHeight: '0px', containerWidth: '0px', name: this.metadata.properties.name, size: 1
      });
    this.field.value = '5';
    this.cdRef.detectChanges();
  }
}
