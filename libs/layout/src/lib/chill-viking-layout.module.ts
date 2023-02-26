import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterDirective, HeaderDirective } from './directives';
import { ChillVikingLayoutComponent } from './layout/chill-viking-layout.component';
import { LayoutContextService } from './services/layout-context.service';
import { LayoutOptions } from './options';
import { defaultOptions, LAYOUT_OPTIONS } from './injection-tokens';

@NgModule({
  imports: [CommonModule],
  declarations: [ChillVikingLayoutComponent, HeaderDirective, FooterDirective],
  exports: [ChillVikingLayoutComponent, HeaderDirective, FooterDirective],
})
export class ChillVikingLayoutModule {
  static forRoot(options?: LayoutOptions) {
    return {
      ngModule: ChillVikingLayoutModule,
      providers: [
        LayoutContextService,
        { provide: LAYOUT_OPTIONS, useValue: options ?? defaultOptions },
      ],
    };
  }
}
