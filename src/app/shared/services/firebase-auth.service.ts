import { Injectable } from '@angular/core';
import { BaseAuthService, Identity, Auth } from "app/shared/services/base-auth.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs/Observable";

@Injectable()
export class FirebaseAuthService extends BaseAuthService<firebase.User> {

  public identityFactory(user: firebase.User): Identity {
    const identity: Identity = {
      token: (<any>user).ie,
      user: {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        pictureUri: user.photoURL
      },
      system: {
        id: (<any>user).B || location.host
      }
    };
    return identity;
  }

  constructor(protected afAuth: AngularFireAuth) {
    super();

    this.afAuth.auth.onAuthStateChanged((user: firebase.User) => {
      this.loadUser(user);
    });
  }

  login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut().then(() => super.logout());
  }

}
