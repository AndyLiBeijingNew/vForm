import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {StateService} from '../../editors/property-editor/state.service';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {VFormMetadata} from '../../services/VFormMetadata';
import {InputFieldComponent} from '../input-field/input-field.component';

@Component({
  selector: 'vform-breast-board',
  templateUrl: './breast-board.component.html'
})
export class BreastBoardComponent implements AfterViewInit, IVFormComponent {
  form: FormGroup;
  metadata: VFormMetadata;
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

  constructor(private stateService: StateService, private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.field.value = '5';
    this.cdRef.detectChanges();
  }
}
