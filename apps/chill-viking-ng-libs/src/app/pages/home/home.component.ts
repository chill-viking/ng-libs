import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChillVikingLayoutModule, LayoutContext } from '@chill-viking/layout';
import { of } from 'rxjs';
import { ChillVikingCallToActionComponent } from '../../features/chill-viking-call-to-action/chill-viking-call-to-action.component';
import { ChillVikingHeaderComponent } from '../../features/chill-viking-header/chill-viking-header.component';
import { ChillVikingNavigationComponent } from '../../features/chill-viking-navigation/chill-viking-navigation.component';
import { WindowRouterService } from '../../services';

@Component({
  selector: 'ng-libs-home',
  standalone: true,
  imports: [
    CommonModule,
    ChillVikingLayoutModule,
    ChillVikingHeaderComponent,
    ChillVikingCallToActionComponent,
    MatIconModule,
    ChillVikingNavigationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  context: LayoutContext = {
    header: {
      title$: of('Chill Viking | ng-libs'),
    },
  };

  subTitle$ = of(
    'Elevate Your Angular Development with Our Handy npm Packages',
  );

  constructor(private _router: WindowRouterService) {}

  goToPackages(): void {
    this._router.navigate(['packages']);
  }

  goToRepository(): void {
    this._router.open('https://github.com/chill-viking/ng-libs');
  }

  goToDiscussions(): void {
    this._router.open('https://github.com/orgs/chill-viking/discussions');
  }
}
