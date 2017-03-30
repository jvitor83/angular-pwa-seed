import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor( ) {
        console.debug('DashboardComponent constructor');
     }

    ngOnInit(): void {
        console.debug('DashboardComponent ngOnInit');
    }
}
