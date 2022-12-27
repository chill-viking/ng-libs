import { LayoutFooterContext } from './layout-footer-context';
import { LayoutHeaderContext } from './layout-header-context';

export type LayoutContext = {
  header: LayoutHeaderContext;
  footer?: LayoutFooterContext;
};
