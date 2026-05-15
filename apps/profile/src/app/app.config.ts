import { provideHttpClient } from "@angular/common/http";
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { BASE_CONFIGURATION } from "@configuration/infrastructure";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore(),
    {
      provide: BASE_CONFIGURATION,
      useValue: environment.baseConfig,
    },
    provideStoreDevtools({
      maxAge: 50,
      logOnly: false,
      trace: true,
    }),
  ],
};
