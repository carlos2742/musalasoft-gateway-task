# GatewayManager

This web app contain a **REST service** and **UI** to manage gateways - devices.

##### Technology used:
- Angular
- **[node 14.17.0](https://nodejs.org/en/download/)** required
- express.js
- mongoose
- **[mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)**

## Install the app

- To start clone or download the app.
- Run `yarn install`.

## Execute the app in dev
- Run `yarn start:server`
- Run `yarn start:client` 
- Navigate to `http://localhost:4200/`.

## Execute the app in prod

- Run `yarn start` to build frontend in prod mode and run the server.The angular build artifacts will be stored in the `dist/` directory.
- Navigate to `http://localhost:3000`.

or

- Run `yarn build` , then execute `yarn start:server`, then navigate to `http://localhost:3000`

## Running unit tests

- Run `yarn test` to execute all unit test.
- Run `yarn test:client` to execute angular unit test.
- RUn `yarn test:server` to execute express unit test.
