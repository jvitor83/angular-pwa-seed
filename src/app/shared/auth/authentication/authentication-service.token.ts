import { InjectionToken } from '@angular/core';
import { ProviderAuthenticationService } from './provider-authentication.service';

export let AUTHENTICATION_SERVICE = new InjectionToken<ProviderAuthenticationService>('AUTHENTICATION_SERVICE');
