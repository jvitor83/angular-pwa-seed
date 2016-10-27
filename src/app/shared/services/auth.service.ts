import { Injectable, EventEmitter, ApplicationRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as Oidc from 'oidc-client';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  mgr: Oidc.UserManager = null;
  userLoadededEvent: EventEmitter<Oidc.User> = new EventEmitter<Oidc.User>();
  currentUser: Oidc.User;
  loggedIn: boolean = false;

  authHeaders: Headers;

  private static isCordova(): boolean {
    try {
      let isCordova = !!((<any>window).cordova);
      return isCordova;
    } catch (e) { return false; }
  }


  constructor(private http: Http, private application: ApplicationRef) {

    let authentication: Oidc.UserManagerSettings = environment.authentication;

    let isCordova = AuthService.isCordova();
    console.debug('isCordova');
    console.debug(<any>isCordova);
    if (isCordova != null && isCordova) {
      console.log('Applying cordova pattern!');

      authentication.redirect_uri = 'https://localhost/oidc';
      authentication.silent_redirect_uri = 'https://localhost/oidc';

      (<any>authentication).popupNavigator = new (<any>Oidc).CordovaPopupNavigator();
      (<any>authentication).iframeNavigator = new (<any>Oidc).CordovaIFrameNavigator();
    }

    this.mgr = new Oidc.UserManager(authentication);

    this.mgr.events.addUserLoaded((e) => {
      this.application.tick();
    });

    this.mgr.getUser()
      .then((user) => {
        if (user) {
          this.loggedIn = true;
          console.log(this.loggedIn);
          this.currentUser = user;
          this.userLoadededEvent.emit(user);
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
    this.mgr.getUser().then((user) => {
      console.log("got user", user);
      this.userLoadededEvent.emit(user);
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

  startSigninMainWindow() {
    let isCordova = AuthService.isCordova();
    console.log('startSigninMainWindow isCordova');
    console.log(isCordova);
    if (isCordova != null && isCordova) {
      this.mgr.signinPopup({ data: 'some data' }).then((user) => {
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
    } else {
      this.mgr.signinRedirect({ data: 'some data' }).then(function () {
        console.log("signinRedirect done");
      }).catch(function (err) {
        console.log(err);
      });
    }
  }

  endSigninMainWindow() {
    this.mgr.signinRedirectCallback().then(function (user) {
      console.log("signed in", user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  startSignoutMainWindow() {
    this.mgr.signoutRedirect().then(function (resp) {
      console.log("signed out", resp);
      setTimeout(5000, () => {
        console.log("testing to see if fired...");

      })
    }).catch(function (err) {
      console.log(err);
    });
  };

  endSignoutMainWindow() {
    this.mgr.signoutRedirectCallback().then(function (resp) {
      console.log("signed out", resp);
    }).catch(function (err) {
      console.log(err);
    });
  };
  /**
   * Example of how you can make auth request using angulars http methods.
   * @param options if options are not supplied the default content type is application/json
   */
  AuthGet(url: string, options?: RequestOptions): Observable<Response> {

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    return this.http.get(url, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPut(url: string, data: any, options?: RequestOptions): Observable<Response> {

    let body = JSON.stringify(data);

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    return this.http.put(url, body, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthDelete(url: string, options?: RequestOptions): Observable<Response> {

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    return this.http.delete(url, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPost(url: string, data: any, options?: RequestOptions): Observable<Response> {

    let body = JSON.stringify(data);

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    return this.http.post(url, body, options);
  }


  private _setAuthHeaders(user: any) {
    this.authHeaders = new Headers();
    this.authHeaders.append('Authorization', user.token_type + " " + user.access_token);
    this.authHeaders.append('Content-Type', 'application/json');
  }
  private _setRequestOptions(options?: RequestOptions) {

    if (options) {
      options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
    }
    else {
      options = new RequestOptions({ headers: this.authHeaders, body: "" });
    }

    return options;
  }

}
