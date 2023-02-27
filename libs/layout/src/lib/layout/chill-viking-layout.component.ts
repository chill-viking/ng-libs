import { ChangeDetectionStrategy, Component, ContentChild, Input, Optional, ViewEncapsulation } from '@angular/core';
import { of } from 'rxjs';
import { FooterDirective, HeaderDirective } from '../directives';
import { AsImplicit } from '../models/as-implicit';
import { LayoutContext } from '../models/layout-context';
import { LayoutContextService } from '../services/layout-context.service';

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
    header: this._layoutContext?.header ?? { title$: of('') },
    footer: this._layoutContext?.footer,
  };

  @ContentChild(HeaderDirective, { read: HeaderDirective })
  headerTemplate?: HeaderDirective;

  @ContentChild(FooterDirective, { read: FooterDirective })
  footerTemplate?: FooterDirective;

  get showFooter(): boolean {
    return !!this.footerTemplate && !!this.data.footer;
  }

  constructor(
    @Optional() private _layoutContext: LayoutContextService,
  ) {
  }

  getContext<T>($implicit: T): AsImplicit<T> {
    return { $implicit };
  }
}
