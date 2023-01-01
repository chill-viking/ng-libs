import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

import { ChillVikingHeaderComponent } from './chill-viking-header.component';

describe('ChillVikingHeaderComponent', () => {
  let component: ChillVikingHeaderComponent;
  let fixture: ComponentFixture<ChillVikingHeaderComponent>;
  let subTitleSubject: BehaviorSubject<string>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChillVikingHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChillVikingHeaderComponent);
    component = fixture.componentInstance;
    component.context = {
      title$: of('Hello'),
    };
    subTitleSubject = new BehaviorSubject<string>('World');
    component.subTitle$ = subTitleSubject.asObservable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should throw error when context not set', () => {
      component.context = undefined;
      expect(() => component.ngOnInit()).toThrowError();
    });
  });

  describe('elements', () => {
    describe('header-image', () => {
      it('should have expected image', () => {
        const element =
          fixture.nativeElement.querySelector('.header-image img');
        expect(element).toBeInstanceOf(HTMLImageElement);
        const img: HTMLImageElement = element;
        expect(img.src).toContain('/assets/viking.svg');
        expect(img.alt).toEqual('Chill Viking');
      });
    });

    describe('header-title', () => {
      let div: HTMLDivElement;

      beforeEach(() => {
        const element = fixture.nativeElement.querySelector('.header-title');
        expect(element).toBeInstanceOf(HTMLDivElement);
        div = element;
      });

      it('should display title in h1 element', () => {
        const h1 = div.querySelector('h1');
        expect(h1).toBeInstanceOf(HTMLHeadingElement);
        expect(h1?.textContent).toEqual('Hello');
      });

      it('should display subTitle in h2 element', () => {
        const h2 = div.querySelector('h2');
        expect(h2).toBeInstanceOf(HTMLHeadingElement);
        expect(h2?.textContent).toEqual('World');
      });

      describe('when subtitle$ not set', () => {
        it('should not render h2', () => {
          subTitleSubject.next('');
          fixture.detectChanges();
          const h2 = fixture.nativeElement.querySelector('.header-title h2');
          expect(h2).toBeFalsy();
        });
      });
    });
  });
});
