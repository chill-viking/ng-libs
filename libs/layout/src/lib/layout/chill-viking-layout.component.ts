import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { of } from 'rxjs';
import { HeaderDirective } from '../directives/header.directive';
import { LayoutContext } from '../models/layout-context';
import { LayoutHeaderContext } from '../models/layout-header-context';

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

  @ContentChild(HeaderDirective, { read: TemplateRef })
  headerTemplate?: TemplateRef<LayoutHeaderContext>;
}
