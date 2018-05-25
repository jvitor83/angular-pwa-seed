// import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/finally';
import { IdentityService } from './../auth/authentication/identity.service';
import { Injectable, Inject, Injector } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers, XHRBackend } from "@angular/http";
import { LoadingController } from '@ionic/angular';
import { OAuthIdentity, OpenIDConnectIdentity } from '../auth/authentication/identity.model';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {

  public loading: HTMLIonLoadingElement;

  constructor(protected identityService: IdentityService, public loadingCtrl: LoadingController) {
    this.loadingCtrl.create().then(ele => this.loading = ele);
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
      .pipe(catchError((error) => {
        // intercept the respons error and displace it to the console
        console.log('Error Occurred:');
        console.log(error);
        // return the error to the method that called it
        return Observable.throw(error);
      }),
        finalize(() => this.loading.dismiss())
      );

    httpHandle.subscribe(() => this.loading.present());

    return httpHandle;

  }
}
