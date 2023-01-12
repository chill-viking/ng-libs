import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ChillVikingLayoutModule, LayoutContext } from '@chill-viking/layout';
import { of } from 'rxjs';
import { ChillVikingHeaderComponent } from '../../features/chill-viking-header/chill-viking-header.component';
import { ChillVikingNavigationComponent } from '../../features/chill-viking-navigation/chill-viking-navigation.component';
import { ChillVikingTableComponent } from '../../features/chill-viking-table/chill-viking-table.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ChillVikingTableComponent,
    ChillVikingLayoutModule,
    ChillVikingHeaderComponent,
    ChillVikingNavigationComponent,
  ],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesComponent {
  packages = [
    {
      name: '@chill-viking/layout',
      description: [
        'This Angular package provides a layout component for your application',
        'that keeps its contents contained within the bounds of the web browser.',
      ].join(' '),
    },
  ];

  layoutContext: LayoutContext = {
    header: {
      title$: of('Chill Viking | ng-libs | Packages'),
    },
  };

  subTitle$ = of('Directory of available packages');
}
