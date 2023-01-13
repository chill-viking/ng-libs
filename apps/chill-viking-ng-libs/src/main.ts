import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';
import { RootComponent } from './app/root.component';
import { rootRouterFeatures, rootRoutes } from './app/routes';
import { PageMetaDataService } from './app/services';

bootstrapApplication(RootComponent, {
  providers: [
    provideRouter(rootRoutes, ...rootRouterFeatures),
    { provide: TitleStrategy, useClass: PageMetaDataService },
  ],
});
