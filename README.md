# GatewayManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Initialize de app

- To initialize clone or download the app.
- Run `npm install`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Set apiUrl variable

Go to *src/environment* and modify the variable **apiUrl**. If you are going to use the app on dev, modify the variable in the `environment.ts` file, if you are using the app in prod, modify `environment.prod.ts`
```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000'
};
```
