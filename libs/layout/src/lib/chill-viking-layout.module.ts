import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterDirective, HeaderDirective } from './directives';
import { ChillVikingLayoutComponent } from './layout/chill-viking-layout.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChillVikingLayoutComponent, HeaderDirective, FooterDirective],
  exports: [ChillVikingLayoutComponent, HeaderDirective, FooterDirective],
})
export class ChillVikingLayoutModule {}
