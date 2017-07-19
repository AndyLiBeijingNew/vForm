import {IAuthenticationService} from '../vform/interfaces/IAuthenticationService';
import {Observable} from 'rxjs/Observable';
import {IAuthenticationResult} from '../vform/interfaces/IAuthenticationResult';
export class FakeAuthenticationService implements IAuthenticationService{
  authenticate(username: string, password: string): Observable<IAuthenticationResult> {
    return Observable.of({successful: true});
  }


}
