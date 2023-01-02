import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RootComponent } from './app/root.component';
import { rootRouterFeatures, rootRoutes } from './app/routes';

bootstrapApplication(RootComponent, {
  providers: [provideRouter(rootRoutes, ...rootRouterFeatures)],
});
