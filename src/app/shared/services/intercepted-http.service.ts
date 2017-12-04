import { Injectable, Inject, Injector } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers, XHRBackend } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { BaseAuthService, AUTH_SERVICE } from "./base-auth.service";
import { LoadingController, Loading } from "ionic-angular";

@Injectable()
export class InterceptedHttp extends Http {

  public loading: Loading;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,
    @Inject(AUTH_SERVICE) protected authService: BaseAuthService<any>, public loadingCtrl: LoadingController) {
    super(backend, defaultOptions);
    this.loading = this.loadingCtrl.create();
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    this.loading.present();
    return observable.finally(() => {
      this.loading.dismiss();
    });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.get(url, this.getRequestOptionArgs(options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.delete(url, this.getRequestOptionArgs(options));
  }

  private updateUrl(req: string) {
    return req;
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }

    if (!options.headers.has('Content-Type')) {
      options.headers.append('Content-Type', 'application/json');
    }

    if (this.authService && this.authService.auth && this.authService.auth.value && this.authService.auth.value.isAuthenticated) {
      options.headers.append('Authorization', 'Bearer ' + this.authService.auth.value.identity.token);
    }

    return options;
  }
}



export function httpFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  authenticationStateService: BaseAuthService<any>,
  loadingController: LoadingController
): Http {
  return new InterceptedHttp(
    xhrBackend,
    requestOptions,
    authenticationStateService,
    loadingController
  );
}
