import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailsComponentComponent } from './pages/details-component/details-component.component';
import { ConversionsDetailsComponent } from './components/conversions-details/conversions-details.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'details/:from/:to',
    component: ConversionsDetailsComponent,
  },
  {
    path: 'currencyDetails/:type',
    component: DetailsComponentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
