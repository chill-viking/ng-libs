import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ChillVikingCallToActionComponent,
} from '../../features/chill-viking-call-to-action/chill-viking-call-to-action.component';
import { WindowRouterService } from '../../services';

@Component({
  selector: 'ng-libs-home',
  standalone: true,
  imports: [
    CommonModule,
    ChillVikingCallToActionComponent,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
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
