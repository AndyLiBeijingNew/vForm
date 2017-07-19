import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TreatmentProgressSummary} from '../components/treatment-progress-header/TreatmentProgressSummary';
import {VFormUrlsInjectionToken} from '../interfaces/VFormUrlsInjectionToken';
import {IUrls} from '../interfaces/IUrls';

@Injectable()
export class RtDataService {

  constructor(@Inject(VFormUrlsInjectionToken) private urls: IUrls, private http: Http) {
  }

  public getTreatmentProgressSummary(patientId: string): Observable<TreatmentProgressSummary> {
    const params = new URLSearchParams();
    params.set('patientId', patientId);
    return this.http.get(this.urls.RtTreatmentSummary, {search: params}).map(r => r.json()).share();
  }

}
