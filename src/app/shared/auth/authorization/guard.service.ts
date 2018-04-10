import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

export abstract class GuardService implements CanActivate {

  protected get routerStateSnapshot() {
    return this.router.routerState.snapshot;
  }

  protected get activatedRouteSnapshot() {
    return this.router.routerState.root.snapshot;
  }

  constructor(
    protected router: Router,
    protected angularLocation: Location,
  ) {
  }

  abstract canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>;

  allow(): Observable<boolean> {
    return Observable.of(true);
  }

  deny(): Observable<boolean> {
    const uri = this.angularLocation.prepareExternalUrl(this.routerStateSnapshot.url);
    localStorage.setItem(location.host + ':callback', location.origin + location.pathname + uri);
    this.router.navigate(['unauthorized']);
    return Observable.of(false);
  }

}
