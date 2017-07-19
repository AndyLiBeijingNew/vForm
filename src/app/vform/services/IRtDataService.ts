import {Observable} from 'rxjs/Observable';
import {TreatmentProgressSummary} from '../components/treatment-progress-header/TreatmentProgressSummary';

export interface IRtDataService {
  getTreatmentProgressSummary(patientId: string): Observable<TreatmentProgressSummary>;
}
