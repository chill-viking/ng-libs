import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ng-libs-cta',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="cta-btn {{ type }}" (click)="buttonClick()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./chill-viking-call-to-action.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChillVikingCallToActionComponent {
  @Input()
  type: 'primary' | 'secondary' = 'primary';

  @Output()
  clicked = new EventEmitter<unknown>();

  buttonClick(): void {
    this.clicked.next({});
  }
}
