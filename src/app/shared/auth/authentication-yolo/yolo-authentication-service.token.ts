import { InjectionToken } from '@angular/core';
import { ProviderAuthenticationService } from '../authentication/provider-authentication.service';

export let YOLO_AUTHENTICATION_SERVICE = new InjectionToken<ProviderAuthenticationService>('YOLO_AUTHENTICATION_SERVICE');
