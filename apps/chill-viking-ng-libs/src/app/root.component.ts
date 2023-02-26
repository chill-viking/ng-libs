import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChillVikingLayoutModule } from '@chill-viking/layout';
import { ChillVikingHeaderComponent } from './features/chill-viking-header/chill-viking-header.component';
import { PageMetaDataService } from './services/page-meta-data.service';
import { ChillVikingNavigationComponent } from './features/chill-viking-navigation/chill-viking-navigation.component';

@Component({
  standalone: true,
  selector: 'ng-libs-root',
  imports: [
    CommonModule,
    RouterOutlet,
    ChillVikingLayoutModule,
    ChillVikingHeaderComponent,
    ChillVikingNavigationComponent,
  ],
  template: `
    <cv-layout>
      <ng-template cvHeader let-header>
        <ng-libs-header [context]='header' [subTitle$]='subTitle$'></ng-libs-header>
      </ng-template>
      <ng-libs-nav></ng-libs-nav>
      <router-outlet></router-outlet>
    </cv-layout>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent {
  subTitle$ = this._pageMetaDataSvc.subTitle$;

  constructor(private _pageMetaDataSvc: PageMetaDataService) {
  }
}
