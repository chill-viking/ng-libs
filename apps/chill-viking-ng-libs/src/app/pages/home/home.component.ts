import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ChillVikingLayoutModule, LayoutContext } from '@chill-viking/layout';
import { of } from 'rxjs';
import { ChillVikingHeaderComponent } from '../../features/chill-viking-header/chill-viking-header.component';

@Component({
  selector: 'ng-libs-home',
  standalone: true,
  imports: [CommonModule, ChillVikingLayoutModule, ChillVikingHeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  context: LayoutContext = {
    header: {
      title$: of('Chill Viking | ng-libs repository'),
    },
  };

  subTitle$ = of(
    'Elevate Your Angular Development with Our Handy npm Packages',
  );
}
