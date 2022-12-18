import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ChillVikingLayoutComponent,
  ChillVikingLayoutModule,
} from '@chill-viking/layout';

describe('ChillVikingLayoutModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ChillVikingLayoutModule],
    }).compileComponents();
  }));

  // dunno if there's a way to test exports...
  describe('declarations', () => {
    it('should have LayoutComponent', () => {
      const fixture = TestBed.createComponent(ChillVikingLayoutComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  });
});
