# GatewayManager

This web app contain a **REST service** and **UI** to manage gateways - devices.

##### Other technology used:
- Angular
- **[node 14.17.0](https://nodejs.org/en/download/)** required
- express.js
- mongoose
- **[mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)**

## Initialize the app

- To start clone or download the app.
- Run `yarn install`.

## Development server

- Run `yarn start` for angular app. Navigate to `http://localhost:4200/`.
- Run `yarn server:start` for express app, it use `port 3000`

## Build the app

Run `yarn app` to build the project. The angular build artifacts will be stored in the `dist/` directory.

## Running unit tests

- Run `yarn app:test` to execute unit test for the whole web app.
- Run `yarn test` to execute angular unit test.
- RUn `yarn server:test` to execute express unit test.
