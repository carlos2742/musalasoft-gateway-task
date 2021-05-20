import mongoose from 'mongoose';
import Gateway from "./gateways.js";
import Device from "./device.js";

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL,{ useCreateIndex: true, useNewUrlParser: true });
};

const models = { Gateway, Device };

export { connectDb };

export default models;
