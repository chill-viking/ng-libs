import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  TemplateRef,
} from '@angular/core';
import {
  AsImplicit,
  HeaderDirectiveTemplateContext,
  LayoutFooterContext,
} from '@chill-viking/layout';

export type FooterDirectiveTemplateContext = AsImplicit<LayoutFooterContext>;

@Directive({
  selector: 'ng-template[cvFooter]',
})
export class FooterDirective extends TemplateRef<FooterDirectiveTemplateContext> {
  constructor(
    private _templateRef: TemplateRef<FooterDirectiveTemplateContext>,
    public readonly elementRef: ElementRef,
  ) {
    super();
  }

  createEmbeddedView(
    context: FooterDirectiveTemplateContext,
    injector: Injector | undefined,
  ): EmbeddedViewRef<FooterDirectiveTemplateContext> {
    return this._templateRef.createEmbeddedView(context, injector);
  }
}
