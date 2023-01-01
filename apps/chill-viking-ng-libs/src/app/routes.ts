import { RouterFeatures, Routes } from '@angular/router';

export const rootRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => {
        // Have to use braces to work around prettier's approach of wrapping lines... ffs
        return c.HomeComponent;
      }),
  },
];

export const rootRouterFeatures: RouterFeatures[] = [];
