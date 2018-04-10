import { InjectionToken } from '@angular/core';
import { BaseAuthenticationService, ProviderAuthenticationService } from './base-authentication.service';

export let AUTHENTICATION_SERVICE = new InjectionToken<ProviderAuthenticationService>('AUTHENTICATION_SERVICE');
