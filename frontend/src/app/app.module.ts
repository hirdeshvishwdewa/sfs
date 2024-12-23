import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './config.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

export function initializeApp(configService: ConfigService, router: Router): () => Promise<void> {
  return async () => {
    try {
      await configService.loadConfig();
    } catch (error) {
      console.error('Initialization Failed:', error);
      // Redirect to error page or handle error as needed
      router.navigateByUrl('/error');
    }
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
