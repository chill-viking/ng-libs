import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderDirective } from './directives/header.directive';
import { ChillVikingLayoutComponent } from './layout/chill-viking-layout.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChillVikingLayoutComponent, HeaderDirective],
  exports: [ChillVikingLayoutComponent, HeaderDirective],
})
export class ChillVikingLayoutModule {}
