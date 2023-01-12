import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ng-libs-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule],
  template: `
    <nav>
      <a routerLink="/home" routerLinkActive="active"> Home </a>
      <a routerLink="/packages" routerLinkActive="active"> Packages </a>
    </nav>
  `,
  styleUrls: ['./chill-viking-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChillVikingNavigationComponent {}
