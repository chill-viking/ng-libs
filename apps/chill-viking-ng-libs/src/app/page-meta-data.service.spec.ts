import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { PageMetaDataService } from './page-meta-data.service';

describe('PageMetaDataService', () => {
  let titleSpy: Title;
  let metaSpy: Meta;
  let service: PageMetaDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserTestingModule],
      providers: [
        PageMetaDataService,
        MockProvider(Title, { setTitle: jest.fn() }),
        MockProvider(Meta, { updateTag: jest.fn() }),
      ],
    }).compileComponents();

    titleSpy = TestBed.inject(Title);
    metaSpy = TestBed.inject(Meta);
    service = TestBed.inject(PageMetaDataService);
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

  describe('updateTitle', () => {
    let snapshot: RouterStateSnapshot;
    let updateMetaSpy: jest.SpiedFunction<(v: RouterStateSnapshot) => void>;

    beforeEach(() => {
      snapshot = createRouterStateSnapshot({
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

      updateMetaSpy = jest.spyOn(service, 'updateMeta');
    });

    it('should set correct title', async () => {
      service.updateTitle(snapshot);
      expect(titleSpy.setTitle).toHaveBeenCalledWith(
        'Third | Second | First | Chill Viking | ng-libs',
      );
    });

    it('should call updateMeta', () => {
      service.updateTitle(snapshot);
      expect(updateMetaSpy).toHaveBeenCalledWith(snapshot);
    });
  });

  describe('updateMeta', () => {
    let snapshot: RouterStateSnapshot;
    let updateTagSpy: jest.SpiedFunction<
      (tag: MetaDefinition, selector?: string) => HTMLMetaElement | null
    >;

    beforeEach(() => {
      snapshot = createRouterStateSnapshot({
        root: createActivatedSnapshot({
          firstChild: createActivatedSnapshot({
            title: 'First',
            firstChild: createActivatedSnapshot({
              title: 'Second',
              data: { meta: { description: 'should be ignored' } },
              firstChild: createActivatedSnapshot({
                title: 'Third',
                data: {
                  meta: {
                    description: 'Third description',
                    other: 'other tag',
                  },
                },
              }),
            }),
          }),
        }),
      });

      updateTagSpy = jest.spyOn(metaSpy, 'updateTag');
    });

    it('should use meta from current activated route data', async () => {
      service.updateMeta(snapshot);
      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'description',
        content: 'Third description',
      });
      expect(updateTagSpy).toHaveBeenCalledWith({
        name: 'other',
        content: 'other tag',
      });
    });
  });
});
