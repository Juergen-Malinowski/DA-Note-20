import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({
    projectId: "da-notes-65b19", appId: "1:322182027128:web:f42761facb2ed366cb9a8d",
    storageBucket: "da-notes-65b19.firebasestorage.app", apiKey: "AIzaSyDfdQ55Oypt4a_2tIxqGPmMblP-cp1vkgs", authDomain: "da-notes-65b19.firebaseapp.com",
    messagingSenderId: "322182027128"
  })),
  provideFirestore(() => getFirestore())]
};
