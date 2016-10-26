import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlankComponent } from './sample/blank/blank.component';
import { AnotherComponent } from './sample/another/another.component';

const routes: Routes = [
  { path: '', component: BlankComponent },
  { path: 'another', component: AnotherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
