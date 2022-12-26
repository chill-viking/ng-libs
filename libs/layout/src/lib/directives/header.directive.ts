import { Directive, ElementRef, EmbeddedViewRef, Injector, TemplateRef } from '@angular/core';
import { AsImplicit } from '../models/as-implicit';
import { LayoutHeaderContext } from '../models/layout-header-context';

export type HeaderDirectiveTemplateContext = AsImplicit<LayoutHeaderContext>;

@Directive({
  selector: 'ng-template[cvHeader]',
})
export class HeaderDirective extends TemplateRef<HeaderDirectiveTemplateContext> {
  constructor(
    private _templateRef: TemplateRef<HeaderDirectiveTemplateContext>,
    public readonly elementRef: ElementRef,
  ) {
    super();
  }

  static ngTemplateContextGuard(
    template: TemplateRef<HeaderDirectiveTemplateContext>,
    context: unknown,
  ): context is HeaderDirectiveTemplateContext {
    return true;
  }

  createEmbeddedView(
    context: HeaderDirectiveTemplateContext,
    injector: Injector | undefined,
  ): EmbeddedViewRef<HeaderDirectiveTemplateContext> {
    return this._templateRef.createEmbeddedView(context, injector);
  }
}
