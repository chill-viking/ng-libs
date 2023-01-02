import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

import { WindowRouterService } from './window-router.service';

describe('WindowRouterService', () => {
  let service: WindowRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(Router)],
    });
    service = TestBed.inject(WindowRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('navigate', () => {
    it('should use Router.navigate', () => {
      const router = TestBed.inject(Router);
      router.navigate = jest.fn();

      service.navigate(['value', '1'], { fragment: '/' });

      expect(router.navigate).toHaveBeenCalledWith(['value', '1'], {
        fragment: '/',
      });
    });
  });

  describe('open', () => {
    it('should use window.open', () => {
      window.open = jest.fn();

      service.open('hello');

      expect(window.open).toHaveBeenCalledWith('hello');
    });
  });
});
