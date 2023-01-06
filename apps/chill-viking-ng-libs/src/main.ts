import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';
import { PageMetaDataService } from './app/page-meta-data.service';
import { RootComponent } from './app/root.component';
import { rootRouterFeatures, rootRoutes } from './app/routes';

bootstrapApplication(RootComponent, {
  providers: [
    provideRouter(rootRoutes, ...rootRouterFeatures),
    { provide: TitleStrategy, useClass: PageMetaDataService },
  ],
});
