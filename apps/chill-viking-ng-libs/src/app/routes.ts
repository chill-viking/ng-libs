import { RouterFeatures, Routes } from '@angular/router';

export const rootRoutes: Routes = [
  {
    path: '',
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
];

export const rootRouterFeatures: RouterFeatures[] = [];
