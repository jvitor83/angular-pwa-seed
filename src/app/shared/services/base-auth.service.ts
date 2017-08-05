import { Observable } from "rxjs/Observable";
import { InjectionToken, Inject } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export let AUTH_SERVICE = new InjectionToken<BaseAuthService<any>>('AUTH_SERVICE');

export interface User {
    id;
    name;
    email;
    pictureUri;
}

export interface System {
    id;
}

export interface Identity {
    user: User;
    system: System;
    token?: string;
}

export class Auth<T> {
    constructor(public claims: T, identityFactory?: (claims: T) => Identity, isAuthenticated = true) {
        this.identity = identityFactory(claims);
        this._isAuthenticated = isAuthenticated;
    }
    public getClaim(claimType: string) {
        const claim = this.claims[claimType];
        return claim;
    }
    public identity: Identity;
    protected _isAuthenticated: boolean;
    public get isAuthenticated() {
        return this._isAuthenticated;
    }
}

export abstract class BaseAuthService<T> {
    protected anonymousIdentity(): Auth<T> {
        const claims: any = { name: 'Anonymous' };
        let anonymous = new Auth(claims, BaseAuthService.prototype.identityFactory, false);
        return anonymous;
    }

    protected goToLastUnauthorizedUri() {
        const lastUri = localStorage.getItem(location.host + ':callback');
        if (lastUri) {
            localStorage.removeItem(location.host + ':callback');
            window.location.assign(lastUri);
        }
    }

    constructor(protected onceLoginGetBackToLastUnauthorizedUri = true) {
        this._auth = new BehaviorSubject<Auth<T>>(this.anonymousIdentity());
        if (onceLoginGetBackToLastUnauthorizedUri) {
            this._auth.subscribe(auth => {
                if (auth.isAuthenticated) {
                    this.goToLastUnauthorizedUri();
                }
            });
        }
    }

    protected loadUser(user: T) {
        if (user == null) {
            this.logout();
        } else {
            const auth = new Auth(user, this.identityFactory);
            this._auth.next(auth);
        }
    }

    protected identityFactory(claims: T): Identity {
        const claimsAsAny: any = claims;
        return <Identity>{
            user: {
                id: claimsAsAny.user_id || claimsAsAny.uid,
                name: claimsAsAny.name,
                email: claimsAsAny.email
            },
            system: {
                id: claimsAsAny.client_id
            },
            token: claimsAsAny.access_token
        }
    }

    private _auth: BehaviorSubject<Auth<T>> = new BehaviorSubject<Auth<T>>(null);
    public get auth(): Observable<Auth<T>> & { value: Auth<T> } {
        const retorno = <Observable<Auth<T>> & { value: Auth<T> }>this._auth;
        return retorno;
    }
    public abstract login();
    public logout() {
        this._auth.next(this.anonymousIdentity());
    }
}
