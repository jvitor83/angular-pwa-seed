import { Injectable, ApplicationRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class LayoutService {

    private _visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public visible: Observable<boolean> = this._visible.asObservable();

    public show() {
        this._visible.next(true);
    }

    public hide() {
        this._visible.next(false);
    }

    public toggle() {
        if (this._visible.value) {
            this.hide();
        } else {
            this.show();
        }
    }

    constructor(private router: Router) {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event) => this._visible.next(true));
    }

}