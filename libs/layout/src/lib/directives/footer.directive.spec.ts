import { Injector } from '@angular/core';
import { FooterDirectiveTemplateContext } from '@chill-viking/layout';
import { MockService } from 'ng-mocks';
import { FooterDirective } from './footer.directive';

describe('FooterDirective', () => {
  let mockedDirective: FooterDirective;
  let context: FooterDirectiveTemplateContext;
  let directive: FooterDirective;

  beforeEach(async () => {
    mockedDirective = MockService(FooterDirective, {
      createEmbeddedView: jest.fn(),
    });
    context = { $implicit: {} };
    directive = new FooterDirective(mockedDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should use injected TemplateRef', () => {
    const injector = MockService(Injector);

    directive.createEmbeddedView(context, injector);

    expect(mockedDirective.createEmbeddedView).toHaveBeenCalledWith(
      context,
      injector,
    );
  });
});
