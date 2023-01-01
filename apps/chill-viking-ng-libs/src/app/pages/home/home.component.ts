import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ChillVikingLayoutModule, LayoutContext } from '@chill-viking/layout';
import { of } from 'rxjs';

@Component({
  selector: 'ng-libs-home',
  standalone: true,
  imports: [CommonModule, ChillVikingLayoutModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  context: LayoutContext = {
    header: {
      title$: of('Chill Viking | ng-libs demos'),
    },
  };
}
