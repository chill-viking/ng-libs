import { RouterFeatures, Routes } from '@angular/router';

export const rootRoutes: Routes = [
  {
    path: 'home',
    title: 'ng-libs | Home',
    data: {
      subTitle: 'Elevate Your Angular Development with Our Handy npm Packages',
      metaTags: {
        description: [
          'High-quality npm packages for Angular projects.',
          'Easy to use and constantly updated.',
          'Explore our packages and join our community.',
        ].join(' '),
      },
    },
    loadComponent: () => import('./pages/home').then((c) => c.HomeComponent),
  },
  {
    path: 'packages',
    title: 'ng-libs | Packages',
    data: {
      subTitle: 'Directory of available packages',
      metaTags: {
        description: [
          'A directory of high-quality npm packages for Angular projects.',
        ].join(' '),
      },
    },
    loadComponent: () =>
      import('./pages/packages').then((c) => c.PackagesComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

export const rootRouterFeatures: RouterFeatures[] = [];
