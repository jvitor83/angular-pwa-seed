import { Platform } from 'ionic-angular';
import { Injectable, EventEmitter, ApplicationRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as Oidc from 'oidc-client';
import { environment } from '../../../environments/environment';
import { BaseAuthService, Auth, Identity } from './base-auth.service';

@Injectable()
export class OidcAuthService extends BaseAuthService<Oidc.User> {
  // user: () => Promise<Oidc.User> = () =>{
  //   return this.getUser();
  // }
  public identityFactory(user: Oidc.User): Identity {

    const identity: Identity = {
      user: {
        id: user.profile.sub || null,
        name: user.profile.name || null,
        email: user.profile.email || null,
        pictureUri: user.profile.picture && user.profile.picture[0] || null
      },
      system: {
        id: user.profile.client_id || null
      },
      token: user.access_token || null
    };
    return identity;
  }


  mgr: Oidc.UserManager = null;
  userLoadededEvent: EventEmitter<Oidc.User> = new EventEmitter<Oidc.User>();
  currentUser: Oidc.User;
  loggedIn: boolean = false;

  authHeaders: Headers;

  private static isCordova(platform?: Platform): boolean {
    try {
      let isCordova = !!((<any>window).cordova);
      let isDesktop = false;
      if (platform != null) {
        isDesktop = platform.is('core');
      }
      return isCordova && (!isDesktop);
    } catch (e) { return false; }
  }


  constructor(private application: ApplicationRef, public platform: Platform) {

    super();
    let authentication: Oidc.UserManagerSettings = environment.authentication;


    localStorage.setItem(location.host + ':environment.authentication', JSON.stringify(environment.authentication));

    let isCordova = OidcAuthService.isCordova();
    console.debug('isCordova');
    console.debug(<any>isCordova);
    if (isCordova != null && isCordova && platform.is('mobileweb') === false) {
      console.log('Applying cordova pattern!');

      // authentication.redirect_uri = 'https://localhost/oidc';
      // authentication.silent_redirect_uri = 'https://localhost/oidc';

      (<any>authentication).popupNavigator = new (<any>Oidc).CordovaPopupNavigator();
      (<any>authentication).iframeNavigator = new (<any>Oidc).CordovaIFrameNavigator();
    }

    this.mgr = new Oidc.UserManager(authentication);

    this.mgr.events.addUserLoaded((e) => {
      this.currentUser = e;
      this.loadUser(this.currentUser);
      this.application.tick();
    });

    this.mgr.getUser()
      .then((user) => {
        if (user) {
          this.loggedIn = true;
          console.log(this.loggedIn);
          this.currentUser = user;
          this.userLoadededEvent.emit(user);

          this.loadUser(user);

        } else {
          this.loggedIn = false;
        }
      })
      .catch((err) => {
        this.loggedIn = false;
      });
    this.mgr.events.addUserUnloaded((e) => {
      if (!environment.production) {
        console.log("user unloaded");
      }
      this.loggedIn = false;
      this.currentUser = null;
    });

  }
  clearState() {
    this.mgr.clearStaleState().then(function () {
      console.log("clearStateState success");
    }).catch(function (e) {
      console.log("clearStateState error", e.message);
    });
  }

  getUser() {
    return this.mgr.getUser().then((user) => {
      console.log("got user", user);
      this.userLoadededEvent.emit(user);
      return user;
    }).catch(function (err) {
      console.log(err);
    });
  }

  removeUser() {
    this.mgr.removeUser().then(() => {
      this.userLoadededEvent.emit(null);
      console.log("user removed");
    }).catch(function (err) {
      console.log(err);
    });
  }

  login() {
    let isCordova = OidcAuthService.isCordova(this.platform);
    console.log('startSigninMainWindow isCordova');
    console.log(isCordova);

    this.mgr.clearStaleState();

    let promise: Promise<Oidc.User> = null;
    if (isCordova != null && isCordova) {
      promise = this.mgr.signinPopup();
    } else {
      promise = this.mgr.signinRedirect();
    }
    return promise;
  }


  logout() {
    return this.mgr.signoutRedirect()
      .then((resp) => {
        console.log('signed out', resp);
        super.logout();
      }).catch((err) => {
        console.log(err);
        try {
          if (environment.authentication.authority.indexOf('google') !== -1) {
            this.googleRevokeAccess(this.auth.value.identity.token);
          }
        } catch (error) {
          console.log(error);
        }
        super.logout();
      });
  }

  googleRevokeAccess(accessToken) {
    fetch('https://accounts.google.com/o/oauth2/revoke?token=' + accessToken,
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
