import {
  Directive,
  EmbeddedViewRef,
  Injector,
  TemplateRef,
} from '@angular/core';
import { AsImplicit, LayoutFooterContext } from '../models';

export type FooterDirectiveTemplateContext = AsImplicit<LayoutFooterContext>;

@Directive({
  selector: 'ng-template[cvFooter]',
})
export class FooterDirective extends TemplateRef<FooterDirectiveTemplateContext> {
  readonly elementRef = this._templateRef.elementRef;

  constructor(
    private _templateRef: TemplateRef<FooterDirectiveTemplateContext>,
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
