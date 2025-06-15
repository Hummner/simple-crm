import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-5f688","appId":"1:187415213090:web:d5d7bd0f85afed426e067b","storageBucket":"simple-crm-5f688.firebasestorage.app","apiKey":"AIzaSyArcn9fYGnri0R1EPK3wP7VDJL9Am_fahY","authDomain":"simple-crm-5f688.firebaseapp.com","messagingSenderId":"187415213090"})), provideFirestore(() => getFirestore())]
};
