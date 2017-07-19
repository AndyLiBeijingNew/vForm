import {Observable} from 'rxjs/Observable';
import {IAuthenticationResult} from './IAuthenticationResult';
export interface IAuthenticationService {
  authenticate(username: string, password: string): Observable<IAuthenticationResult>;
}
