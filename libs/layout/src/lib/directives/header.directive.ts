import {
  Directive,
  EmbeddedViewRef,
  Injector,
  TemplateRef,
} from '@angular/core';
import { AsImplicit } from '../models/as-implicit';
import { LayoutHeaderContext } from '../models/layout-header-context';

export type HeaderDirectiveTemplateContext = AsImplicit<LayoutHeaderContext>;

@Directive({
  selector: 'ng-template[cvHeader]',
})
export class HeaderDirective extends TemplateRef<HeaderDirectiveTemplateContext> {
  readonly elementRef = this._templateRef.elementRef;

  constructor(
    private _templateRef: TemplateRef<HeaderDirectiveTemplateContext>,
  ) {
    super();
  }

  createEmbeddedView(
    context: HeaderDirectiveTemplateContext,
    injector: Injector | undefined,
  ): EmbeddedViewRef<HeaderDirectiveTemplateContext> {
    return this._templateRef.createEmbeddedView(context, injector);
  }
}
