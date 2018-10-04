import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
  declarations: [
    AppComponent, JwPaginationComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
