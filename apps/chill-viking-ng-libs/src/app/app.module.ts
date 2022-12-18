import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChillVikingLayoutModule } from '@chill-viking/layout';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChillVikingLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
