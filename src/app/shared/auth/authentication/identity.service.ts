import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Identity } from './identity.model';
import { Injectable, ApplicationRef, NgZone } from '@angular/core';

@Injectable()
export class IdentityService {

  protected anonymous = <Identity>{ name: 'Anonymous', isAuthenticated: false };

  private _user: BehaviorSubject<Identity> = new BehaviorSubject<Identity>(this.anonymous);
  public user: Observable<Identity> = this._user.asObservable();
  public get userValue(): Identity { return this._user.getValue(); }

  constructor() {
  }

  public load(user: Identity) {
    if (!user) {
      throw Error('It is mandatory to inform the user!');
    }
    this._user.next(user);
  }

  public unload() {
    this._user.next(this.anonymous);
  }

}
