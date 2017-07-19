import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {TreatmentProgressSummary} from './TreatmentProgressSummary';
import {TranslateService} from 'ng2-translate';
import {RtDataService} from '../../services/rtdata.service';
import {VFormComponentBase} from '../VFormComponentBase';
import {HelperService} from '../../editors/property-editor/helper.service';
import {RtDataServiceInjectionToken} from '../../interfaces/RtDataServiceInjectionToken';
import {IRtDataService} from '../../services/IRtDataService';

@Component({
  selector: 'vform-treatment-progress',
  templateUrl: './treatment-progress.component.html'
})
export class TreatmentProgressComponent extends VFormComponentBase implements  AfterViewInit {

  @Input()
  patientId: string;

  treatmentProgressSummary: TreatmentProgressSummary;
  private emptyTreatmentChartMessage: string;

  constructor(helperService: HelperService, private translateService: TranslateService,
              @Optional() @Inject(RtDataServiceInjectionToken) private injectedRtDataService: IRtDataService,
              private cdRef: ChangeDetectorRef) {
    super(helperService);
    this.emptyTreatmentChartMessage = this.translateService.instant('no_treatment_records');
  }

  ngAfterViewInit() {
    const patientIdValue = this.patientId || this.form.context.patient.patientId;
    if (this.injectedRtDataService) {
      this.injectedRtDataService.getTreatmentProgressSummary(patientIdValue).subscribe(t => {
        if (t) {
          this.treatmentProgressSummary = t;
          this.emptyTreatmentChartMessage = null;
        } else {
          this.treatmentProgressSummary = null;
          this.emptyTreatmentChartMessage = this.translateService.instant('no_treatment_records');
        }
        this.cdRef.detectChanges();
      });
    }
  }
}
