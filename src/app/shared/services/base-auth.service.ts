import { Observable } from "rxjs/Observable";
import { InjectionToken, Inject } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export let AUTH_SERVICE = new InjectionToken<NewAuthService<any>>('AUTH_SERVICE');


// export interface AuthService<T extends IAuthenticated> {
//     login(): Promise<T>;
//     logout(): Promise<void>;
//     authenticated: BehaviorSubject<T>;
// }

// export abstract class BaseAuthService<T extends IAuthenticated> implements AuthService<T> {
//     abstract login(): Promise<T>;
//     abstract logout(): Promise<void>;
//     constructor(protected authenticated: BehaviorSubject<T>) { }
//     get claims(): Claims {
//         return this.authenticated && this.authenticated.value && this.authenticated.value.claims;
//     }
// }

export abstract class BaseAuthService<T extends IAuthenticated> {
    public authenticated: BehaviorSubject<T> = new BehaviorSubject<T>(null);
    protected abstract authenticate(): Promise<T>;
    login() {
        return this.authenticate().then(authenticated => {
            this.authenticated.next(authenticated);
        });
    }
    protected unauthenticate(): Promise<void> {
        return Promise.resolve();
    }
    logout() {
        return this.unauthenticate().then(() => {
            this.authenticated.next(null);
        });
    }
}

export abstract class OAuthService extends BaseAuthService<OAuthAuthenticated> {
    get accessToken(): string {
        return this.authenticated.value.claims.access_token;
    };
}

export abstract class OpenIDAuthService extends BaseAuthService<OpenIDAuthenticated> {
    get idToken(): string {
        return this.authenticated.value.claims.id_token;
    };
}





//Basic Claims Infrastructure

// export interface ClaimCollection {
//     [name: string]: any | null;
// }

export interface IHaveClaimCollection {
    claims: any;
}

export interface Claims extends BehaviorSubject<any> {
}

export class BaseInfo<T extends any> implements IHaveClaimCollection {
    constructor(public claims: T) { }
    public getClaim(claimType: string) {
        const claim = this.claims[claimType];
        return claim;
    }
}
//


// Basic Informations used by the Software (Components/Services)

export interface ISystem extends BaseInfo<any> {
    id;
}

export class System extends BaseInfo<any> implements ISystem {
    id;
}

export interface IUser extends BaseInfo<any> {
    id;
    email;
    name;
    pictureUri?;
}
export class User extends BaseInfo<any> implements IUser {
    id;
    email;
    name;
    pictureUri?;
}

export interface IAuthenticated extends BaseInfo<any> {
    system: ISystem;
    user?: IUser;
}

export class Authenticated<T extends any> extends BaseInfo<T> implements IAuthenticated {
    system: System;
    user?: User;
    constructor(claims: T) {
        super(claims);
        this.system = new System(claims);
        this.user = new User(claims);
    }
}



// OAuth/OpenID infrastructure

export interface OAuthPayload {
    access_token: string;
    client_id;
}

export interface OpenIDPayload extends OAuthPayload {
    id_token: string;
    user_id;
    email;
    name;
}

export class OAuthSystem extends BaseInfo<OAuthPayload> implements ISystem {
    get id() { return this.claims.client_id; }
}

export class OpenIDUser extends BaseInfo<OpenIDPayload> implements IUser {
    get id() { return this.claims.user_id; }
    get email() { return this.claims.email; }
    get name() { return this.claims.name; }
}




const accessTokenParse = function (oauthPayload: OAuthPayload) {
    let accessToken: string = oauthPayload.access_token;
    let accessTokenContent: any = {};
    try {
        accessToken = accessToken.split('.')[1];
        accessTokenContent = JSON.parse(atob(accessToken));
    } catch (error) {
        console.log(error);
    }
    const accessTokenContentReturn = Object.assign({}, { 'access_token': accessToken }, oauthPayload, accessTokenContent);
    return accessTokenContentReturn;
}

const openIDTokenParse = function (openIDPayload: OpenIDPayload) {
    let idToken: string = openIDPayload.access_token;
    let idTokenContent: any = {};
    try {
        idToken = idToken.split('.')[1];
        idTokenContent = JSON.parse(atob(idToken));
    } catch (error) {
        console.log(error);
    }
    const idTokenContentReturn = Object.assign({}, { 'id_token': idToken }, openIDPayload, idTokenContent);
    return idTokenContentReturn;
}

export class OAuthAuthenticated extends Authenticated<OAuthPayload> {
    constructor(claims: OAuthPayload) {
        super(claims);

        const accessTokenContentPayload = accessTokenParse(claims);
        this.system = new OAuthSystem(accessTokenContentPayload);
    }
}


export class OpenIDAuthenticated extends Authenticated<OpenIDPayload> implements OAuthAuthenticated {
    constructor(claims: OpenIDPayload) {
        super(claims);

        const accessTokenContentPayload = accessTokenParse(claims);
        this.system = new OAuthSystem(accessTokenContentPayload);

        const idTokenContentPayload = openIDTokenParse(claims);
        this.user = new OpenIDUser(idTokenContentPayload);
    }
}


// NEW

export abstract class Info<T> {
    constructor(protected authenticated: T) {
    }
}

export interface NewUser {
    id;
    name;
    email;
    pictureUri;
}

export interface NewSystem {
    id;
}

export interface Identity {
    user: NewUser;
    system: NewSystem;
    token?: string;
}

export class Auth<T> extends Info<T> {
    identity: Identity;

    constructor(protected authenticated: T, identityFactory: (info: T) => Identity) {
        super(authenticated);

        const identity = identityFactory(authenticated);
        this.identity = identity;
        // const promiseIdentity = <Promise<Identity>>identity;
        // const identityItself = <Identity>identity;
        // if (identityItself) {
        //     this.identity = identityItself;
        // } else if (promiseIdentity) {
        //     promiseIdentity.then(identityFromPromise => {
        //         this.identity = identityFromPromise;
        //     });
        // }
    }

    public get claims() {
        return this.authenticated;
    }
    public getClaim(string) {
        return this.claims[string];
    }
}

export abstract class NewBaseAuthService<T> {
    public auth: BehaviorSubject<Auth<T>> = new BehaviorSubject<Auth<T>>(null);

    private _user: T;
    protected set user(user: T) {
        const auth = new Auth(user, this.identityFactory);
        this.auth.next(auth);
        this._user = user;
    }

    public abstract identityFactory(user: T): Identity;
    // //public abstract loadIdentity(user: T, identityFactory: (info: T) => Identity);
    public abstract login();
    public logout() {
        this.auth.next(null);
    }
}



//
export interface ClaimsCollection {
    [name: string]: any | null;
}

export abstract class ClaimType {
    static CLIENT_ID = 'client_id';
    static NAME = 'name';
    static USER_ID = 'user_id';
    static ACCESS_TOKEN = 'access_token';
    static EMAIL = 'email';
}
// export interface Identity {

// }

export class Principal<T extends ClaimsCollection> {
    private _identity: BehaviorSubject<Identity> = new BehaviorSubject<Identity>(null);
    constructor(public claims: T, identityFactory: (claims: T) => Identity | Promise<Identity>) {
        const identityToInfer = identityFactory(claims);

        let promiseIdentity: Promise<Identity> = null;
        const identity = <Identity>identityToInfer;
        const identityPromise = <Promise<Identity>>identityToInfer;
        if (identity) {
            promiseIdentity = Promise.resolve(identity);
        } else if (identityPromise) {
            promiseIdentity = identityPromise;
        }

        promiseIdentity.then(identity => {
            this._identity.next(identity);
        });
    }
    public getClaim(claimType: string) {
        return this.claims[claimType];
    }
    public identity(): Identity {
        return this._identity.value;
    }
}

export abstract class NewAuthService<T extends ClaimsCollection> {

    abstract get user(): () => Promise<T>;

    constructor() {

    }

    private _auth: Principal<T> = new Principal<T>(null, this.identityFactory);
    public get auth(): Principal<T> {
        this.user().then(claims => {
            this._auth = new Principal(claims, this.identityFactory);
            //this._auth.next(new Principal(claims, this.identityFactory));
        });
        return this._auth;
    }

    protected abstract identityFactory(claims: T): Promise<Identity>;


    //{
    // const identity = <Identity>{
    //     token: claims[ClaimType.ACCESS_TOKEN],
    //     system: <NewSystem>{
    //         id : claims[ClaimType.CLIENT_ID]
    //     },
    //     user: <NewUser>{
    //         id: claims[ClaimType.USER_ID],
    //         name: claims[ClaimType.NAME],
    //         email: claims[ClaimType.EMAIL],
    //         pictureUri: null
    //     }
    // }
    // return identity;
    //}
    public abstract login();
    public logout() {
        //this._auth..next(null);
    }
}


//

// export interface ClaimsCollection {
//     [name: string]: any | null;
// }

export class Principal2<T> extends BaseInfo<T> {
    constructor(public claims: T, identityFactory?: (claims: T) => Identity, isAuthenticated = true) {
        super(claims);
        this.identity = identityFactory(claims);
        // if (identityFactory) {
        //     this.identity = identityFactory(claims);
        // } else {
        //     const defaultIdentityFactory: (claims: T) => Identity = (claims: any) => {
        //         return <Identity>{
        //             user: {
        //                 id: claims.user_id || claims.uid,
        //                 name: claims.name,
        //                 email: claims.email
        //             },
        //             system: {
        //                 id: claims.client_id
        //             },
        //             token: claims.access_token
        //         }
        //     }
        //     this.identity = defaultIdentityFactory(claims);
        // }
        this._isAuthenticated = isAuthenticated;
    }
    public identity: Identity;
    protected _isAuthenticated: boolean;
    public get isAuthenticated() {
        return this._isAuthenticated;
    }
    // user: NewUser;
    // system: NewSystem;
    // token?: string;
}

export abstract class BaseAuthService2<T> {
    protected anonymousIdentity(): Principal2<T> {
        const claims: any = { name: 'Anonymous' };
        let anonymous = new Principal2(claims, BaseAuthService2.prototype.identityFactory, false);
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

        this._principal = new BehaviorSubject<Principal2<T>>(this.anonymousIdentity());
        if (onceLoginGetBackToLastUnauthorizedUri) {
            this._principal.subscribe(principal => {
                if (principal.isAuthenticated) {
                    this.goToLastUnauthorizedUri();
                }
            });
        }
    }

    protected loadUser(user: T) {
        if (user == null) {
            this.logout();
        } else {
            const principal = new Principal2(user, this.identityFactory);
            this._principal.next(principal);
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

    private _principal: BehaviorSubject<Principal2<T>> = new BehaviorSubject<Principal2<T>>(null);
    public get principal(): Observable<Principal2<T>> & { value: Principal2<T> } {
        const retorno = <Observable<Principal2<T>> & { value: Principal2<T> }>this._principal;
        return retorno;
    }
    //public principalValue = () => this._principal.value;
    public abstract login();
    public logout() {


        this._principal.next(this.anonymousIdentity());
    }
}