import { InjectionToken } from '@angular/core';
import {IAuthenticationService} from './IAuthenticationService';

export let AuthenticationServiceInjectionToken = new InjectionToken<IAuthenticationService>('IAuthenticationService');
