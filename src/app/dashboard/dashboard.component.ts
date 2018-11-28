import { MenuController } from '@ionic/angular';
import { Component, OnInit, ApplicationRef, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../layout/layout.service';

@Component({
    moduleId: module.id,
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    constructor(public menu: MenuController, public zone: NgZone, public application: ApplicationRef,
        public layoutService: LayoutService) {
            
    }
    
    toggleLayout() {
        this.layoutService.toggle();
    }
}
