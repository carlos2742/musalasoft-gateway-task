import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import httpError from "http-errors";
import 'dotenv/config';
import path from "path";

import routes, {home} from "./api/routes/index.js"
import models, { connectDb } from "./api/models/index.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const distDir = path.dirname("") + "/dist/";
app.use(express.static(distDir));

app.use("/", home);
app.use("/api/gateways", routes.gateway);
app.use("/api/devices", routes.device);

app.use((req, res, next)=>{
  next(httpError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const eraseDatabaseOnSync = false;
connectDb().then(async () => {
  if(eraseDatabaseOnSync){
    await Promise.all([
      models.Gateway.deleteMany({}),
      models.Device.deleteMany({})
    ]);
    seedDb();
  }

  const server = app.listen(process.env.PORT || 8080,() =>{
    const port = server.address().port;
    console.log(`Example app listening on port ${port}!`)
  });
});

const seedDb = async() => {
  const gateway1 = new models.Gateway({
    serial: '537G',
    name: 'Europe',
    ipv4: '10.0.0.1',
  });

  const gateway2 = new models.Gateway({
    serial: '79HX',
    name: 'America',
    ipv4: '10.0.0.2',
  });

  const device1 = new models.Device({
    uid: 1,
    vendor: 'Huawei',
    created: new Date(),
    status: 'online',
    gateway: gateway1.id,
  });

  const device2 = new models.Device({
    uid: 2,
    vendor: 'Cisco',
    created: new Date(),
    status: 'offline',
    gateway: gateway1.id,
  });


  const device3 = new models.Device({
    uid: 3,
    vendor: 'Cisco',
    created: new Date(),
    status: 'online',
    gateway: gateway2.id,
  });


  await device1.save();
  await device2.save();
  await device3.save();

  await gateway1.save();
  await gateway2.save();
}

