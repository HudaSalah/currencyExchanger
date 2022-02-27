import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConverterComponent } from './components/converter/converter.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ConversionsDetailsComponent } from './pages/conversions-details/conversions-details.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DetailsComponentComponent } from './pages/details-component/details-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ConverterComponent,
    LoaderComponent,
    ConversionsDetailsComponent,
    HomePageComponent,
    BreadcrumbComponent,
    DetailsComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
