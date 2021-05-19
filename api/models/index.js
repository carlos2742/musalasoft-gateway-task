import mongoose from 'mongoose';
import Gateway from "./gateways.js";
import Device from "./device.js";
import seed from "./seed.js";

const connect = (uri) => {
  return mongoose.connect(uri,{ useCreateIndex: true, useNewUrlParser: true });
};

const disconnect = () =>{
  return mongoose.disconnect();
};

const populate = () =>{
  return seed();
};

const clean = () =>{
  return Promise.all([
    Gateway.deleteMany({}),
    Device.deleteMany({})]);
};

const models = { Gateway, Device };

const schema = {
  models,
  db:{ connect, disconnect, populate, clean}
};

export default schema;
