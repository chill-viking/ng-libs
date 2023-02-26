import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { PageMetaDataService } from './page-meta-data.service';
import { LayoutContextService } from '@chill-viking/layout';

describe('PageMetaDataService', () => {
  let layoutContextSpy: LayoutContextService;
  let metaSpy: Meta;
  let service: PageMetaDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserTestingModule],
      providers: [
        PageMetaDataService,
        MockProvider(LayoutContextService, { updateHeaderTitle: jest.fn() }),
        MockProvider(Meta, { updateTag: jest.fn() }),
      ],
    }).compileComponents();

    layoutContextSpy = TestBed.inject(LayoutContextService);
    metaSpy = TestBed.inject(Meta);
    service = TestBed.inject(PageMetaDataService);
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  const createActivatedSnapshot = ({
    outlet = 'primary',
    ...val
  }: Partial<ActivatedRouteSnapshot>): ActivatedRouteSnapshot =>
    ({ outlet, ...val } as ActivatedRouteSnapshot);

  const createRouterStateSnapshot = (
    val: Partial<RouterStateSnapshot>,
  ): RouterStateSnapshot => val as RouterStateSnapshot;

  describe('updateTitle', () => {
    let currentSnapshot: ActivatedRouteSnapshot;
    let snapshot: RouterStateSnapshot;
    let updateMetaSpy: jest.SpiedFunction<(v: RouterStateSnapshot) => void>;

    beforeEach(() => {
      currentSnapshot = createActivatedSnapshot({
        title: 'Third',
        data: { subTitle: 'This is the third' },
      });

      snapshot = createRouterStateSnapshot({
        root: createActivatedSnapshot({
          children: [
            createActivatedSnapshot({
              title: 'First',
              children: [
                createActivatedSnapshot({
                  title: 'Second',
                  children: [currentSnapshot],
                }),
              ],
            }),
          ],
        }),
      });

      updateMetaSpy = jest.spyOn(service, 'updateMeta').mockImplementation(() => {
        /* do nothing */
      });
    });

    it('should set correct title', async () => {
      service.updateTitle(snapshot);
      expect(layoutContextSpy.updateHeaderTitle).toHaveBeenCalledWith('Third');
    });

    it('should call updateMeta', () => {
      service.updateTitle(snapshot);
      expect(updateMetaSpy).toHaveBeenCalledWith(snapshot);
    });

    it('should emit correct subtitle', (done) => {
      service.updateTitle(snapshot);
      service.subTitle$.subscribe((subTitle) => {
        expect(subTitle).toEqual('This is the third');
        done();
      });
    });

    describe('when no subTitle available', () => {
      it('should emit empty string', () => {
        currentSnapshot.data = {};
        service.updateTitle(snapshot);
        service.subTitle$.subscribe((subTitle) => {
          expect(subTitle).toEqual('');
        });
      });
    });
  });

  describe('updateMeta', () => {
    let snapshot: RouterStateSnapshot;
    let updateTagSpy: jest.SpiedFunction<
      (tag: MetaDefinition, selector?: string) => HTMLMetaElement | null
    >;

    beforeEach(() => {
      updateTagSpy = jest.spyOn(metaSpy, 'updateTag');
    });

    it('should use meta from current activated route data', async () => {
      snapshot = createRouterStateSnapshot({
        root: createActivatedSnapshot({
          children: [
            createActivatedSnapshot({
              children: [
                createActivatedSnapshot({
                  data: {
                    metaTags: {
                      description: 'Third description',
                      other: 'other tag',
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      });

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

    describe('when no metaTags available', () => {
      it('should do nothing', () => {
        snapshot = createRouterStateSnapshot({
          root: createActivatedSnapshot({
            children: [
              createActivatedSnapshot({
                data: {},
              }),
            ],
          }),
        });

        service.updateMeta(snapshot);
        expect(updateTagSpy).not.toHaveBeenCalled();
      });
    });
  });
});
