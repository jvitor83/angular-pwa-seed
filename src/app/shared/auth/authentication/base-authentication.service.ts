import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IdentityTransformationService } from './identity-transformation.service';
import { Injectable, Inject } from '@angular/core';
import { IdentityService } from './identity.service';
import { Identity } from './identity.model';
import { AUTHENTICATION_SERVICE } from './authentication-service.token';
import { Credential } from '@openid/openyolo';


export interface IAuthenticationService {
  login(credential?: Credential): void;
  logout(): void;
}

export abstract class ProviderAuthenticationService implements IAuthenticationService {
  public abstract login(credential?: Credential): void;
  constructor(protected identityService: IdentityService) { }
  public logout(): void {
    this.identityService.unload();
  }
}

export class AuthenticationService implements IAuthenticationService {
  login(credential?: Credential): void {
    return this.authService.login(credential);
  }
  logout(): void {
    return this.authService.logout();
  }
  constructor( @Inject(AUTHENTICATION_SERVICE) private authService: ProviderAuthenticationService) {
  }
}

@Injectable()
export abstract class BaseAuthenticationService<UserType extends any> extends ProviderAuthenticationService {
  protected providerUser: BehaviorSubject<UserType> = new BehaviorSubject<UserType>(null);
  // protected providerUser: Observable<UserType> = this._providerUser.asObservable();

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

