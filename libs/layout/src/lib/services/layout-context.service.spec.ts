import { TestBed } from '@angular/core/testing';
// noinspection ES6PreferShortImport
import { LayoutContextService } from './layout-context.service';
import { Title } from '@angular/platform-browser';
import { first, timeout } from 'rxjs';
import { LAYOUT_OPTIONS, LayoutOptions } from '../../index';

describe('LayoutContextService', () => {
  let service: LayoutContextService;
  let titleSpy: Partial<Title>;
  const options: LayoutOptions = {
    updatePageTitle: false,
    copyrightHolder: 'copyright-holder',
    defaultTitle: 'initial-title',
  };

  beforeEach(() => {
    titleSpy = {
      setTitle: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Title, useValue: titleSpy },
        { provide: LAYOUT_OPTIONS, useValue: options },
        LayoutContextService,
      ],
    });
    service = TestBed.inject(LayoutContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('context properties', () => {
    describe('footer', () => {
      describe('when options copyrightHolder is set', () => {
        beforeEach(() => {
          options.copyrightHolder = 'hello';
        });

        it('should be defined', () => {
          expect(service.footer).toHaveProperty('copyrightHolder', 'hello');
        });
      });

      describe('when copyrightHolder is not set', () => {
        beforeEach(() => {
          options.copyrightHolder = undefined;
        });

        it('should not be defined', () => {
          expect(service.footer).toBeUndefined();
        });
      });
    });

    describe('header', () => {
      describe('when title not yet set', () => {
        describe('and defaultTitle is set', () => {
          beforeEach(() => {
            options.defaultTitle = 'hello';
          });

          it('should be defined', (done) => {
            service.header.title$.pipe(first(), timeout(50)).subscribe((actual) => {
              expect(actual).toEqual('hello');
              done();
            });
          });
        });

        describe('and defaultTitle is not set', () => {
          beforeEach(() => {
            options.defaultTitle = undefined;
          });

          it('should be empty string', (done) => {
            service.header.title$.pipe(first(), timeout(50)).subscribe((actual) => {
              expect(actual).toEqual('');
              done();
            });
          });
        });
      });
    });
  });

  describe(`${LayoutContextService.prototype.updateHeaderTitle.name}`, () => {
    it('should emit header title', (done) => {
      service.updateHeaderTitle('title');
      service.header.title$.pipe(first(), timeout(50)).subscribe((actual) => {
        expect(actual).toEqual('title');
        done();
      });
    });

    describe(`with updatePageTitle set to true`, () => {
      beforeEach(() => {
        options.updatePageTitle = true;
      });

      describe('and no template set', () => {
        it('should use Title', () => {
          service.updateHeaderTitle('title');
          expect(titleSpy.setTitle).toHaveBeenCalledWith('title');
        });
      });

      describe('and template set', () => {
        it('should use template for page title', () => {
          options.pageTitleTemplate = 'Look at {title} here, with {title} again';
          service.updateHeaderTitle('this title');
          expect(titleSpy.setTitle).toHaveBeenCalledWith(
            'Look at this title here, with this title again',
          );
        });
      });
    });

    describe('with updatePageTitle set to false', () => {
      it('should not use Title', () => {
        options.updatePageTitle = false;
        service.updateHeaderTitle('title');
        expect(titleSpy.setTitle).not.toHaveBeenCalled();
      });
    });
  });
});
