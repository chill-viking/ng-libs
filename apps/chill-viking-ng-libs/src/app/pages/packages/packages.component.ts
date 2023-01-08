import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ChillVikingTableComponent } from '../../features/chill-viking-table/chill-viking-table.component';

@Component({
  standalone: true,
  imports: [CommonModule, ChillVikingTableComponent],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesComponent {
  data = [
    {
      name: '@chill-viking/layout',
      description: [
        'This Angular package provides a layout component for your application',
        'that keeps its contents contained within the bounds of the web browser.',
      ].join(' '),
    },
  ];
}
