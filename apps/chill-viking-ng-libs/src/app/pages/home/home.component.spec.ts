import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ChillVikingCallToActionComponent } from '../../features/chill-viking-call-to-action/chill-viking-call-to-action.component';
import { ChillVikingHeaderComponent } from '../../features/chill-viking-header/chill-viking-header.component';
import { WindowRouterService } from '../../services';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: WindowRouterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        MockComponent(ChillVikingHeaderComponent),
        MockComponent(ChillVikingCallToActionComponent),
      ],
      providers: [MockProvider(WindowRouterService)],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(WindowRouterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('goToPackages', () => {
    it('should navigate to /packages', () => {
      router.navigate = jest.fn();

      component.goToPackages();

      expect(router.navigate).toHaveBeenCalledWith(['packages']);
    });
  });

  describe('goToRepository', () => {
    it('should open new window to repository', () => {
      router.open = jest.fn();

      component.goToRepository();

      expect(router.open).toHaveBeenCalledWith(
        'https://github.com/chill-viking/ng-libs',
      );
    });
  });

  describe('goToDiscussions', () => {
    it('should open new window to discussions', () => {
      router.open = jest.fn();

      component.goToDiscussions();

      expect(router.open).toHaveBeenCalledWith(
        'https://github.com/orgs/chill-viking/discussions',
      );
    });
  });
});
