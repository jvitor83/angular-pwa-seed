import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { IdentityService } from './../authentication/identity.service';
import { BaseAuthenticationService } from '../authentication/base-authentication.service';
import * as firebase from 'firebase/app';
import { FirebaseIdentityTransformationService } from './firebase-identity-transformation.service';

@Injectable()
export class FirebaseAuthenticationService extends BaseAuthenticationService<firebase.User> {

  constructor(
    protected afAuth: AngularFireAuth,
    protected identityService: IdentityService,
    protected identityTransformService: FirebaseIdentityTransformationService
  ) {
    super(identityService, identityTransformService);

    this.afAuth.auth.onAuthStateChanged((user: firebase.User) => {
      this.providerUser.next(user);
    });
  }
  public login(): void {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
