import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderDirective } from './directives/header.directive';
import { ChillVikingLayoutComponent } from './layout/chill-viking-layout.component';
import { FooterDirective } from './directives/footer.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ChillVikingLayoutComponent, HeaderDirective, FooterDirective],
  exports: [ChillVikingLayoutComponent, HeaderDirective, FooterDirective],
})
export class ChillVikingLayoutModule {}
