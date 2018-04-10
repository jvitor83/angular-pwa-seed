import { YOLO_AUTHENTICATION_SERVICE } from './yolo-authentication-service.token';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Credential, OnDemandOpenYoloApi, TokenProvider } from '@openid/openyolo';
import { YoloIdentityTransformationService } from './yolo-identity-transformation.service';
import {
  BaseAuthenticationService, AuthenticationService,
  ProviderAuthenticationService
} from '../authentication/base-authentication.service';
import { Injectable, Inject, Injector, ReflectiveInjector } from '@angular/core';
import { IdentityService } from '../authentication/identity.service';

@Injectable()
export class YoloAuthenticationService extends BaseAuthenticationService<Credential> {

  constructor(
    protected identityService: IdentityService,
    protected identityTransformService: YoloIdentityTransformationService,
    protected authenticationSettings: [{ uri: string, clientId: string }],
    @Inject(YOLO_AUTHENTICATION_SERVICE) protected wrappedAuthenticationService: ProviderAuthenticationService,
  ) {
    super(identityService, identityTransformService);

    // if ((!this.authenticationSettings) || this.authenticationSettings.length <= 0) {
    //   authenticationSettings = [
    //     {
    //       uri: 'https://accounts.google.com',
    //       clientId: '929544282709-8mkof7adolh13fnualb2f4f176mjd2ot.apps.googleusercontent.com'
    //     }
    //   ];
    // }

    this.tryLoadScript();

    // this.afAuth.auth.onAuthStateChanged((user: Credential) => {
    //   this.providerUser.next(user);
    // });
  }

  private yolo: OnDemandOpenYoloApi;
  private yoloPromise: Promise<void>;

  tryLoadScript() {
    (<any>window).onGoogleYoloLoad = (googleyolo) => {
      console.log('fired');
      this.yolo = googleyolo;
    };
    this.yoloPromise = this.loadScript('https://smartlock.google.com/client').then(() => {
      if ((<any>window).googleyolo) {
        // return ((<any>window).googleyolo);
        console.log('loaded');
      }
    });
  }

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = <HTMLScriptElement>document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
      document.body.appendChild(scriptElement);
    });
  }



  public login(credential?: Credential, force: boolean = true): void {

    const credentialRequestOptions: any = {};
    this.authenticationSettings.forEach(setting => {
      credentialRequestOptions.supportedAuthMethods = credentialRequestOptions.supportedAuthMethods || [];
      credentialRequestOptions.supportedIdTokenProviders = credentialRequestOptions.supportedIdTokenProviders || [];

      (<Array<string>>credentialRequestOptions.supportedAuthMethods).push(setting.uri);
      (<Array<TokenProvider>>credentialRequestOptions.supportedIdTokenProviders).push(setting);
    });

    const credentialPromise = this.yoloPromise.then(() => {
      const promise = this.yolo.retrieve(credentialRequestOptions);
      return promise;
    });


    credentialPromise.then((credentialRetrieved) => {
      if (credentialRetrieved) {
        this.providerUser.next(credentialRetrieved);
      } else {
        console.log('No credential choosed!');
      }
    }, (error) => {
      console.log(error);

      if (force) {
        switch (error.type) {
          case 'userCanceled':
            // The user closed the hint selector. Depending on the desired UX,
            // request manual sign up or do nothing.
            break;
          case 'noCredentialsAvailable':
            // No hint available for the session. Depending on the desired UX,
            // request manual sign up or do nothing.

            this.yolo.hint(Object.assign(credentialRequestOptions, {
              showAddAccount: true
            })
              // {
              //   supportedAuthMethods: [
              //     // 'openyolo://id-and-password',
              //     'https://accounts.google.com'
              //   ],
              //   supportedIdTokenProviders: [
              //     {
              //       uri: 'https://accounts.google.com',
              //       clientId: this.authenticationSettings.
              //     }
              //   ]
              // }
            ).catch((err) => {
              console.error(err);


              // if get here, an error ocurred, then should make the login manually.
              this.wrappedAuthenticationService.login();

            });

            break;
          case 'requestFailed':
            // The request failed, most likely because of a timeout.
            // You can retry another time if necessary.
            this.wrappedAuthenticationService.login();

            break;
          case 'operationCanceled':
            // The operation was programmatically canceled, do nothing.
            break;
          case 'illegalConcurrentRequest':
            // Another operation is pending, this one was aborted.
            break;
          case 'initializationError':
            // Failed to initialize. Refer to error.message for debugging.
            break;
          case 'configurationError':
            // Configuration error. Refer to error.message for debugging.
            break;
          default:
          // Unknown error, do nothing.
        }
      }
    });
  }

  public logout(): void {
    try {
      this.wrappedAuthenticationService.logout();
    } catch (err) {
      console.error(err);
    }
    super.logout();
    this.yolo.disableAutoSignIn();
  }
}
