import { IdentityTransformationService } from './identity-transformation.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProviderAuthenticationService } from './provider-authentication.service';
import { IdentityService } from './identity.service';
import { Identity } from './identity.model';

@Injectable()
export abstract class BaseAuthenticationService<UserType extends any> extends ProviderAuthenticationService {
  protected providerUser: BehaviorSubject<UserType> = new BehaviorSubject<UserType>(null);

  protected goToLastUnauthorizedUri() {
    const lastUri = localStorage.getItem(location.host + ':callback');
    if (lastUri) {
      localStorage.removeItem(location.host + ':callback');
      window.location.assign(lastUri);
    }
  }

  constructor(
    protected identityService: IdentityService,
    protected identityTransformService: IdentityTransformationService<UserType, Identity>
  ) {
    super(identityService);
    this.providerUser.subscribe(user => {
      if (user) {
        const transformedUser = this.identityTransformService.transform(user);
        this.identityService.load(transformedUser);

        if (transformedUser.isAuthenticated) {
          this.goToLastUnauthorizedUri();
        }

      }
    });
  }
}

