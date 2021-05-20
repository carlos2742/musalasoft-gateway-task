import mongoose from 'mongoose';
import Gateway from "./gateway.model.js";
import DeviceModel from "./device.model.js";
import seed from "./seed.js";

const connect = (uri) => {
  return mongoose.connect(uri,{ poolSize:10, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
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
    DeviceModel.deleteMany({})]);
};

export default {
  models: { Gateway, Device: DeviceModel },
  db:{ connect, disconnect, populate, clean}
};


