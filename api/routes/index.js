import express from 'express';

import gateway from "./gateway.js"
import device from "./device.js"

const home = express.Router();

/* GET home page. */
home.get('/', function(req, res, next) {
  res.send({message:'Welcome to the Gateway Api'});
});

const routes = {gateway, device};
export {home};
export default routes;
