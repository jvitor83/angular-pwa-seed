import { BehaviorSubject } from 'rxjs';
import { Injectable, Optional } from '@angular/core';
import { IdentityService } from './../authentication/identity.service';
import { BaseAuthenticationService } from '../authentication/base-authentication.service';
import { Observable } from 'rxjs';
import { OidcIdentityTransformationService } from './oidc-identity-transformation.service';
import * as Oidc from 'oidc-client';
import { Platform } from '@ionic/angular';
import { OpenIDConnectIdentity } from '../authentication/identity.model';

@Injectable()
export class OidcAuthenticationService extends BaseAuthenticationService<Oidc.User> {

  userManager: Oidc.UserManager = null;

  constructor(
    protected identityService: IdentityService,
    protected identityTransformService: OidcIdentityTransformationService,
    protected authenticationSettings: Oidc.UserManagerSettings,
    @Optional() private platform?: Platform,
  ) {
    super(identityService, identityTransformService);

    const isCordova = OidcAuthenticationService.isCordova();
    if (isCordova != null && isCordova && (platform != null && platform.is('mobileweb') === false)) {
      console.log('Applying cordova pattern!');
      (<any>authenticationSettings).popupNavigator = new (<any>Oidc).CordovaPopupNavigator();
      (<any>authenticationSettings).iframeNavigator = new (<any>Oidc).CordovaIFrameNavigator();
    }

    this.userManager = new Oidc.UserManager(authenticationSettings);
    localStorage.setItem(location.host + ':environment.authentication', JSON.stringify(authenticationSettings));
    this.userManager.events.addUserLoaded((user) => {
      if (user) {
        this.providerUser.next(user);
      }
    });
    this.userManager.getUser().then((user) => {
      if (user) {
        this.providerUser.next(user);
      }
    });
  }

  private static isCordova(platform?: Platform): boolean {
    try {
      const isCordova = !!((<any>window).cordova);
      let isDesktop = false;
      if (platform != null) {
        isDesktop = platform.is('core');
      }
      return isCordova && (!isDesktop);
    } catch (e) { return false; }
  }

  public login(): void {
    const isCordova = OidcAuthenticationService.isCordova(this.platform);
    console.log('startSigninMainWindow isCordova');
    console.log(isCordova);

    this.userManager.clearStaleState();

    if (isCordova != null && isCordova) {
      this.userManager.signinPopup().then((user) => {
        if (user) {
          this.providerUser.next(user);
        }
      });
    } else {
      this.userManager.signinRedirect();
    }

  }

  public logout() {
    return this.userManager.signoutRedirect()
      .then((resp) => {
        try {
          if (this.authenticationSettings.authority.indexOf('google') !== -1) {
            this.googleRevokeAccess((<OpenIDConnectIdentity>this.identityService.userValue).accessToken);
          }
        } catch (error) {
          console.log(error);
        }
      })
      .then(() => super.logout())
      .catch((error) => super.logout());

  }

  googleRevokeAccess(accessToken) {
    fetch(this.authenticationSettings.metadata.revocation_endpoint + '?token=' + accessToken,
      {
        mode: 'no-cors',
        method: 'GET',
        // body: {
        //   token: accessToken
        // }
      }).then(r => {
        console.log(r.statusText);
      }).catch(err => {
        console.error(err);
      });
  }

}
