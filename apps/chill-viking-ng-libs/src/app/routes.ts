import { RouterFeatures, Routes } from '@angular/router';

export const rootRoutes: Routes = [
  {
    path: 'home',
    title: 'Home',
    data: {
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
    title: 'Packages',
    data: {
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
