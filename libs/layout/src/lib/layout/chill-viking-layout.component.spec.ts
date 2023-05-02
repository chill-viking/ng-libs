import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChillVikingLayoutComponent, FooterDirective, LayoutContextService } from '../../index';
import { MockService } from 'ng-mocks';
import { first, of } from 'rxjs';

describe('ChillVikingLayoutComponent', () => {
  let component: ChillVikingLayoutComponent;
  let fixture: ComponentFixture<ChillVikingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: LayoutContextService,
          useValue: MockService(
            LayoutContextService,
            {
              header: { title$: of('service title') },
            },
          ),
        },
      ],
      declarations: [ChillVikingLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChillVikingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default [data] using LayoutContextService', (done) => {
    expect(component.data.header).toBeTruthy();

    component.data.header.title$.pipe(first()).subscribe((defaultTitle) => {
      expect(defaultTitle).toContain('service title');
      done();
    });
  });

  describe('getContext', () => {
    it('should created expected context', () => {
      const actual = component.getContext({ value: 'hello' });
      expect(actual).toEqual({ $implicit: { value: 'hello' } });
    });
  });

  describe('get showFooter', () => {
    const checkShowFooter = (combinedResult: boolean) => {
      describe('and [data.footer] is undefined', () => {
        it('should return false', () => {
          expect(component.data.footer).toBeUndefined();
          expect(component.showFooter).toBeFalsy();
        });
      });

      describe('and [data.footer] is defined', () => {
        it(`should return ${combinedResult}`, () => {
          component.data.footer = {
            copyrightHolder: 'hello',
          };
          expect(component.showFooter).toEqual(combinedResult);
        });
      });
    };

    describe('when footerTemplate is defined', () => {
      beforeEach(() => {
        component.footerTemplate = MockService(FooterDirective);
      });

      checkShowFooter(true);
    });

    describe('when footerTemplate is undefined', () => {
      beforeEach(() => {
        component.footerTemplate = undefined;
      });

      checkShowFooter(false);
    });
  });
});
