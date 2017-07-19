import {IRtDataService} from '../vform/services/IRtDataService';
import {Observable} from 'rxjs/Observable';
import {TreatmentProgressSummary} from '../vform/components/treatment-progress-header/TreatmentProgressSummary';
import {PlanSummary} from '../vform/components/treatment-progress-header/PlanSummary';

export class FakeRtDataService implements IRtDataService {
  getTreatmentProgressSummary(patientId: string): Observable<TreatmentProgressSummary> {
    return Observable.of(new TreatmentProgressSummary(new Date(), [
      new PlanSummary('planSetupId1', 'Plan 1', 21, 30, 42, 60, []),
      new PlanSummary('planSetupId2', 'Plan 3', 1, 30, 2, 60, [])
    ]));
  }

}
