import { Injector } from '@angular/core';
import { HeaderDirectiveTemplateContext } from '@chill-viking/layout';
import { MockService } from 'ng-mocks';
import { HeaderDirective } from './header.directive';

describe('HeaderDirective', () => {
  let mockedDirective: HeaderDirective;
  let context: HeaderDirectiveTemplateContext;
  let directive: HeaderDirective;

  beforeEach(async () => {
    mockedDirective = MockService(HeaderDirective, {
      createEmbeddedView: jest.fn(),
    });
    directive = new HeaderDirective(mockedDirective);
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
