import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConverterComponent } from './components/converter/converter.component';
import { ConversionsDetailsComponent } from './components/conversions-details/conversions-details.component';
const routes: Routes = [
  {
    path: '',
    component: ConverterComponent,
  },
  {
    path: 'details/:currency',
    component: ConversionsDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
