import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { of } from 'rxjs';
import { FooterDirective, HeaderDirective } from '../directives';
import { AsImplicit } from '../models/as-implicit';
import { LayoutContext } from '../models/layout-context';

@Component({
  selector: 'cv-layout',
  templateUrl: './chill-viking-layout.component.html',
  styleUrls: ['./chill-viking-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChillVikingLayoutComponent {
  @Input()
  data: LayoutContext = {
    header: {
      title$: of(`[data] not supplied`),
    },
  };

  @ContentChild(HeaderDirective, { read: HeaderDirective })
  headerTemplate?: HeaderDirective;

  @ContentChild(FooterDirective, { read: FooterDirective })
  footerTemplate?: FooterDirective;

  get showFooter(): boolean {
    return !!this.footerTemplate && !!this.data.footer;
  }

  getContext<T>($implicit: T): AsImplicit<T> {
    return { $implicit };
  }
}
