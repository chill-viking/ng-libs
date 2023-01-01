import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { LayoutHeaderContext } from '@chill-viking/layout';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ng-libs-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chill-viking-header.component.html',
  styleUrls: ['./chill-viking-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChillVikingHeaderComponent implements OnInit {
  @Input()
  context: LayoutHeaderContext | undefined;

  @Input()
  subTitle$: Observable<string> | undefined;

  title$: Observable<string> | undefined;

  ngOnInit(): void {
    if (!this.context) throw new Error('[context] not defined to drive header');

    this.title$ = this.context?.title$;

    this.subTitle$ = this.subTitle$ ? this.subTitle$ : of('');
  }
}
