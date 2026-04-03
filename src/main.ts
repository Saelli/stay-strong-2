import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyATIh2aQU02A4I0WVJZWrm0TQJ7pk_ShRY",
      authDomain: "stay-strong-dddcc.firebaseapp.com",
      projectId: "stay-strong-dddcc",
      storageBucket: "stay-strong-dddcc.firebasestorage.app",
      messagingSenderId: "120827998061",
      appId: "1:120827998061:web:4cda087fe838ae1b10b464",
      measurementId: "G-639H5CS3Y0"
    })),
    provideAuth(() => getAuth()),
  ],
}).catch(err => console.error(err));
