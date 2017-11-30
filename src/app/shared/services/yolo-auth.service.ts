import { openyolo, OnDemandOpenYoloApi, Credential } from '@openid/openyolo';

import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { BaseAuthService, Auth, Identity } from './base-auth.service';


@Injectable()
export class YoloAuthService extends BaseAuthService<Credential> {

  // protected get yolo(): Promise<OnDemandOpenYoloApi> {
  //   const ret = (<OnDemandOpenYoloApi>(<any>window).googleyolo);
  //   return ret;


  //   return (<any>window).onGoogleYoloLoad;
  // }
  protected yolo: OnDemandOpenYoloApi;

  protected identityFactory(user: Credential): Identity {
    const identity: Identity = {
      user: {
        id: user.id || null,
        name: user.displayName || null,
        email: user.id || null,
        pictureUri: user.profilePicture || null
      },
      system: {
        id: environment.authentication.client_id || null
      },
      token: user.idToken || null
    };
    return identity;
  }



  constructor() {
    (<any>window).onGoogleYoloLoad = (googleyolo) => {
      this.yolo = googleyolo;
    };

    super();
  }


  login(force = true) {
    const credentialPromise = this.yolo.retrieve({
      supportedAuthMethods: [
        // 'openyolo://id-and-password',
        'https://accounts.google.com'
      ],
      supportedIdTokenProviders: [
        {
          uri: 'https://accounts.google.com',
          clientId: environment.authentication.client_id
        }
      ]
    }).then((credential) => {
      if (credential) {
        // user selected credential, use it to sign in
        switch (credential.authMethod) {
          case 'openyolo://id-and-password':
            console.log('Username and password choosed!');

            // Call the API to authenticate (validate) the credentials
            // This can be an OAuth2/OpenID Connect Identity Provider
            // Since this app don't have a Login Form (with username and password),
            // this is not supported (openyolo at supportedAuthMethod is commented)!
            // > By design is intend to use a Identity Provider to authenticate the user.


            break;
          case 'https://accounts.google.com':
            console.log('Google credential choosed!');

            // Only leave this, if you use Google as Identity Provider
            this.loadUser(credential);

            break;
        }
      } else {
        console.log('No credential choosed!');
        // no credential selected, so do the manual authentication flow

      }
    }, (error) => {
      console.log(error);

      switch (error.type) {
        case "userCanceled":
          // The user closed the hint selector. Depending on the desired UX,
          // request manual sign up or do nothing.
          break;
        case "noCredentialsAvailable":
          // No hint available for the session. Depending on the desired UX,
          // request manual sign up or do nothing.
          if (force) {
            this.yolo.hint({
              showAddAccount: true,
              supportedAuthMethods: [
                // 'openyolo://id-and-password',
                'https://accounts.google.com'
              ],
              supportedIdTokenProviders: [
                {
                  uri: 'https://accounts.google.com',
                  clientId: environment.authentication.client_id
                }
              ]
            }).catch((err) => {
              console.error(err);
            });
          }
          break;
        case "requestFailed":
          // The request failed, most likely because of a timeout.
          // You can retry another time if necessary.
          break;
        case "operationCanceled":
          // The operation was programmatically canceled, do nothing.
          break;
        case "illegalConcurrentRequest":
          // Another operation is pending, this one was aborted.
          break;
        case "initializationError":
          // Failed to initialize. Refer to error.message for debugging.
          break;
        case "configurationError":
          // Configuration error. Refer to error.message for debugging.
          break;
        default:
        // Unknown error, do nothing.
      }
    });
  }



  logout() {
    this.yolo.disableAutoSignIn().then(() => {
      // Auto sign-in disabled.
      super.logout();
    });

  }
}
