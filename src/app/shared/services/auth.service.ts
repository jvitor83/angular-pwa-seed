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
        pictureUri: user.profile.picture[0] || null
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
          // const principal = new Principal2(user, this.identityFactory);
          // this.principal.next(principal);
          //this.user = user;
          // const auth = new Auth<Oidc.User>(
          //   user,
          //   (info) => {
          //     const identity: Identity = {
          //       user: {
          //         id: info.profile.sub || null,
          //         name: info.profile.name || null,
          //         email: info.profile.email || null,
          //         pictureUri: info.profile.picture[0] || null
          //       },
          //       system: {
          //         id: info.profile.client_id || null
          //       },
          //       token: info.access_token || null
          //     };

          //     return identity;
          //   }
          // );
          // this.auth.next(auth);
          // let payload = Object.assign({}, user, user.profile);
          // let authenticated = new OpenIDAuthenticated(payload);
          // this.auth.next(authenticated);
        }
        else {
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

  // authenticate(): Promise<OpenIDAuthenticated> {
  //   let isCordova = OidcAuthService.isCordova(this.platform);
  //   console.log('startSigninMainWindow isCordova');
  //   console.log(isCordova);

  //   this.mgr.clearStaleState();

  //   let promise: Promise<Oidc.User> = null;
  //   if (isCordova != null && isCordova) {
  //     promise = this.mgr.signinPopup();
  //   } else {
  //     promise = this.mgr.signinRedirect();
  //   }
  //   let promiseTransform = promise.then(user => {
  //     return new OpenIDAuthenticated(user as any);
  //   });
  //   return promiseTransform;
  // }

  /*
  .then((user) => {
          console.log("signinPopup done");
          console.log(user);
   
          console.log('this.userLoadededEvent.emit(user);');
          this.userLoadededEvent.emit(user);
          //console.log('this.mgr.signinPopupCallback().then(function () {');
          // this.mgr.signinPopupCallback().then(function () {
          //   console.log("signinPopupCallback done");
          // }).catch(function (err) {
          //   console.log(err);
          // });
          this.mgr.events.load(user);
          this.currentUser = user;
          this.loggedIn = true;
        }).catch(function (err) {
          console.log(err);
        });
   */


  // endSigninMainWindow() {
  //   this.mgr.signinRedirectCallback().then(function (user) {
  //     console.log("signed in", user);
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  // }


  logout() {
    //this.principal.next(null);
    super.logout();
    return this.mgr.signoutRedirect().then(function (resp) {
      console.log("signed out", resp);
    }).catch(function (err) {
      console.log(err);
    });
  };
  // unauthenticate() {
  //   return this.mgr.signoutRedirect().then(function (resp) {
  //     console.log("signed out", resp);
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  // };

  // endSignoutMainWindow() {
  //   this.mgr.signoutRedirectCallback().then(function (resp) {
  //     console.log("signed out", resp);
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  // };
  
}
