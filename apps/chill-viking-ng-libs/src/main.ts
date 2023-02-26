import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';
import { RootComponent } from './app/root.component';
import { rootRouterFeatures, rootRoutes } from './app/routes';
import { PageMetaDataService } from './app/services';
import { ChillVikingLayoutModule } from '@chill-viking/layout';

// noinspection JSIgnoredPromiseFromCall
bootstrapApplication(RootComponent, {
  providers: [
    provideRouter(rootRoutes, ...rootRouterFeatures),
    PageMetaDataService,
    { provide: TitleStrategy, useExisting: PageMetaDataService },
    ChillVikingLayoutModule.provideServices({
      updatePageTitle: true,
      pageTitleTemplate: 'Chill Viking | {title}',
    }),
  ],
});
