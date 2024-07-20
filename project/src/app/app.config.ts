import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ThemeService } from './service/theme.service';
import { provideHttpClient } from '@angular/common/http';
import { SearchService } from './service/search.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), ThemeService, SearchService, provideHttpClient(),]
};
