import {Component, Input, OnInit} from '@angular/core';
import {StateService} from '../../editors/property-editor/state.service';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {VFormMetadata} from '../../services/VFormMetadata';

@Component({
  selector: 'app-breast-board',
  templateUrl: './breast-board.component.html'
})
export class BreastBoardComponent implements IVFormComponent {
  form: FormGroup;
  metadata: VFormMetadata;

  @Input()
  angle = 5;

  getOverlayClass (): string {
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
    };
    return c;
  }

  constructor(private stateService: StateService) {
  }
}
