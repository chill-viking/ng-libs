import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';

import { ChillVikingCallToActionComponent } from './chill-viking-call-to-action.component';

describe('ChillVikingCallToActionComponent', () => {
  let component: ChillVikingCallToActionComponent;
  let fixture: ComponentFixture<ChillVikingCallToActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChillVikingCallToActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChillVikingCallToActionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit to clicked when button clicked', (done) => {
    let usedClick = false;
    component.clicked.pipe(first()).subscribe(() => {
      expect(usedClick).toBeTruthy();
      done();
    });

    usedClick = true;
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeInstanceOf(HTMLButtonElement);
    button.click();
  });

  it('should default to primary', () => {
    expect(component.type).toEqual('primary');
  });

  describe('when type is primary', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should use primary class for button', () => {
      const button = fixture.nativeElement.querySelector(
        'button.cta-btn.primary:not(secondary)',
      );
      expect(button).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('when type is secondary', () => {
    beforeEach(() => {
      component.type = 'secondary';
      fixture.detectChanges();
    });

    it('should use secondary class for button', () => {
      const button = fixture.nativeElement.querySelector(
        'button.cta-btn.secondary:not(primary)',
      );
      expect(button).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
