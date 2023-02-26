import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ChillVikingLayoutComponent,
  ChillVikingLayoutModule,
  defaultOptions,
  LAYOUT_OPTIONS,
  LayoutContextService,
  LayoutOptions,
} from '@chill-viking/layout';

describe('ChillVikingLayoutModule', () => {
  const assertHasLayoutComponent = () => {
    it('should have LayoutComponent', () => {
      const fixture = TestBed.createComponent(ChillVikingLayoutComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  };

  describe('direct import', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ChillVikingLayoutModule],
      }).compileComponents();
    }));

    // dunno if there's a way to test exports...
    describe('declarations', () => {
      assertHasLayoutComponent();
    });
  });

  describe('forRoot', () => {
    let layoutContextSvc: LayoutContextService;

    const forRootBeforeEach = (
      options?: LayoutOptions,
      beforeFn?: () => void,
    ) => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [ChillVikingLayoutModule.forRoot(options)],
        }).compileComponents();

        layoutContextSvc = TestBed.inject(LayoutContextService);

        if (beforeFn) {
          beforeFn();
        }
      });
    };

    const assertOptions = (options: Partial<LayoutOptions>) => {
      it('should have options', () => {
        const injectedOptions = TestBed.inject(LAYOUT_OPTIONS);
        expect(injectedOptions).toEqual(expect.objectContaining(options));
      });
    };

    describe('without options', () => {
      forRootBeforeEach();

      assertHasLayoutComponent();

      it('should provide LayoutContextService', () => {
        expect(layoutContextSvc).toBeTruthy();
      });

      assertOptions(defaultOptions);
    });

    describe('with options', () => {
      forRootBeforeEach({
        updatePageTitle: true,
        defaultTitle: 'Hello World',
        copyrightHolder: 'The Dude',
      });

      assertHasLayoutComponent();

      it('should provide LayoutContextService', () => {
        expect(layoutContextSvc).toBeTruthy();
      });

      assertOptions({ updatePageTitle: true });
      assertOptions({ defaultTitle: 'Hello World' });
      assertOptions({ copyrightHolder: 'The Dude' });
    });
  });
});
