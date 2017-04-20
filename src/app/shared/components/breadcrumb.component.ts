import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'breadcrumbs',
    template: `
    <ion-toolbar class="breadcrumbbar">
        <ion-title>
            <ol>
                <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
                    <li class="breadcrumb-item" *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/' || breadcrumb.label.title&&last" [ngClass]="{active: last}">
                        <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
                        <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
                        <span *ngIf="!last">/</span>
                    </li>
                </ng-template>
            </ol>
        </ion-title>
    </ion-toolbar>
    `,
styles: [`
    ol {
        list-style-type: none;
        display: -webkit-inline-flex;
        display: inline-flex;
        padding: 0px;
    }
    li {
        padding: 0px 0px 0px 15px;
    }
    a {
        color: #c7c7c7;
    }
    .breadcrumbbar {
        height: 35px !important;
        min-height: 35px !important;
    }
`]
})
export class BreadcrumbsComponent implements OnInit {
    breadcrumbs: Array<Object>;
    constructor(private router: Router, private route: ActivatedRoute) { }
    ngOnInit(): void {
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            this.breadcrumbs = [];
            let currentRoute = this.route.root,
                url = '';
            do {
                let childrenRoutes = currentRoute.children;
                currentRoute = null;
                childrenRoutes.forEach(route => {
                    if (route.outlet === 'primary') {
                        let routeSnapshot = route.snapshot;
                        url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
                        this.breadcrumbs.push({
                            label: route.snapshot.data,
                            url: url
                        });
                        currentRoute = route;
                    }
                });
            } while (currentRoute);
        });
    }
}
