import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AsImplicit,
  FooterDirective,
  HeaderDirective,
  LayoutContext,
} from '../../index';
import { of } from 'rxjs';

type Immutable<T> = {
  readonly [K in keyof T]: Immutable<Required<T[K]>>;
};

// each property set to required to force update when LayoutContext changes.
const layoutContext: Immutable<LayoutContext> = {
  header: {
    title$: of('a title'),
  },
  footer: {
    copyrightHolder: 'a person',
  },
};

@Component({
  selector: 'cv-layout-renderer',
  template: `
    <div id="header-block">
      <ng-container
        *ngTemplateOutlet="headerTemplate; context: getContext(ctx.header)"
      ></ng-container>
    </div>
    <div id="footer-block">
      <ng-container
        *ngTemplateOutlet="footerTemplate; context: getContext(ctx.footer)"
      ></ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LayoutRendererComponent {
  @ContentChild(FooterDirective, { read: FooterDirective })
  footerTemplate!: FooterDirective;

  @ContentChild(HeaderDirective, { read: HeaderDirective })
  headerTemplate!: HeaderDirective;

  ctx: LayoutContext = layoutContext as LayoutContext;

  getContext<T>($implicit: T): AsImplicit<T> {
    return { $implicit };
  }
}

@Component({
  template: `
    <cv-layout-renderer>
      <ng-template cvFooter let-footer>
        <p>{{ footer.copyrightHolder }}</p>
        <span class="json">{{ footer | json }}</span>
      </ng-template>
      <ng-template cvHeader let-header>
        <p>{{ header.title$ | async }}</p>
        <span class="json">{{ header | json }}</span>
      </ng-template>
    </cv-layout-renderer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('Directives as Templates', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FooterDirective,
        HeaderDirective,
        HostComponent,
        LayoutRendererComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // if component can be created, then directives can be created.
    expect(component).toBeTruthy();
  });

  const theoryForTemplate = <T>(
    template: 'header' | 'footer',
    expectedInnerHtml: string,
    expectedJsonObject: T,
  ) => {
    describe(`${template}-template`, () => {
      it('should render paragraph as expected', () => {
        const element = fixture.nativeElement.querySelector(
          `#${template}-block p`,
        );
        expect(element).toHaveProperty('innerHTML', expectedInnerHtml);
      });

      it('should render context as expected', () => {
        const element = fixture.nativeElement.querySelector(
          `#${template}-block span.json`,
        );
        expect(element).toHaveProperty(
          'innerHTML',
          JSON.stringify(expectedJsonObject, null, 2),
        );
      });
    });
  };

  theoryForTemplate('footer', `a person`, layoutContext.footer);

  theoryForTemplate('header', `a title`, layoutContext.header);
});
