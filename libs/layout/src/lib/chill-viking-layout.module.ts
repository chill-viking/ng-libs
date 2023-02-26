import { CommonModule } from '@angular/common';
import { EnvironmentProviders, ModuleWithProviders, NgModule, Provider } from '@angular/core';
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
  static forRoot(options?: LayoutOptions): ModuleWithProviders<ChillVikingLayoutModule> {
    return {
      ngModule: ChillVikingLayoutModule,
      providers: this.provideServices(options),
    };
  }

  static provideServices(options?: LayoutOptions): Array<Provider | EnvironmentProviders> {
    return [
      { provide: LAYOUT_OPTIONS, useValue: options ?? defaultOptions },
      LayoutContextService,
    ];
  }
}
