// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Firebase access 
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA_qSL7Db7J52mrL0XYFqkR8Il95lxTiks",
    authDomain: "angular-auth-chat.firebaseapp.com",
    databaseURL: "https://angular-auth-chat.firebaseio.com",
    projectId: "angular-auth-chat",
    storageBucket: "angular-auth-chat.appspot.com",
    messagingSenderId: "363297175958",
    appId: "1:363297175958:web:972e9fe50aa56803bc85b7"
  
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
