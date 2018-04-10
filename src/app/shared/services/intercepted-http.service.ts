import { IdentityService } from './../auth/authentication/identity.service';
import { Injectable, Inject, Injector } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers, XHRBackend } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { LoadingController, Loading } from 'ionic-angular';
import { OAuthIdentity, OpenIDConnectIdentity } from '../auth/authentication/identity.model';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {

  public loading: Loading;

  constructor(protected identityService: IdentityService, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (!req.headers.has('Content-Type')) {
      req.headers.append('Content-Type', 'application/json');
    }


    if (this.identityService && this.identityService.userValue && this.identityService.userValue.isAuthenticated) {
      const token =
        (<OAuthIdentity>this.identityService.userValue).accessToken ||
        (<OpenIDConnectIdentity>this.identityService.userValue).idToken;
      req.headers.append('Authorization', 'Bearer ' + token);
    }



    const httpHandle = next
    .handle(req)
    .catch((error) => {
        // intercept the respons error and displace it to the console
        console.log('Error Occurred:');
        console.log(error);
        // return the error to the method that called it
        return Observable.throw(error);
    })
    .finally(() => this.loading.dismiss());

    httpHandle.subscribe(() => this.loading.present());

    return httpHandle;

  }
}
