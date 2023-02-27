import { InjectionToken } from '@angular/core';
import { LayoutOptions } from './options';

export const LAYOUT_OPTIONS = new InjectionToken<LayoutOptions>(
  'LAYOUT_OPTIONS',
);

export const defaultOptions: LayoutOptions = {
  updatePageTitle: false,
};
