import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { PageTitleStrategyService } from './page-title-strategy.service';

describe('PageTitleStrategyService', () => {
  let titleSpy: Title;
  let service: PageTitleStrategyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserTestingModule],
      providers: [
        PageTitleStrategyService,
        MockProvider(Title, { setTitle: jest.fn() }),
      ],
    }).compileComponents();

    titleSpy = TestBed.inject(Title);
    service = TestBed.inject(PageTitleStrategyService);
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  const createActivatedSnapshot = (
    val: Partial<ActivatedRouteSnapshot>,
  ): ActivatedRouteSnapshot => val as ActivatedRouteSnapshot;
  const createRouterStateSnapshot = (
    val: Partial<RouterStateSnapshot>,
  ): RouterStateSnapshot => val as RouterStateSnapshot;

  it('sets correct title', async () => {
    const snapshot = createRouterStateSnapshot({
      root: createActivatedSnapshot({
        firstChild: createActivatedSnapshot({
          title: 'First',
          firstChild: createActivatedSnapshot({
            title: 'Second',
            firstChild: createActivatedSnapshot({ title: 'Third' }),
          }),
        }),
      }),
    });

    service.updateTitle(snapshot);
    expect(titleSpy.setTitle).toHaveBeenCalledWith(
      'Third | Second | First | Chill Viking',
    );
  });
});
