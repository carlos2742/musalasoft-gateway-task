import app from "../../app.js";
import supertest  from "supertest";
import schema from "../../models";

const Gateway = schema.models.Gateway;
const Device = schema.models.Device;
const Request = supertest(app);

const startDB = () =>{
  return schema.db.connect(process.env.DATABASE_URL_TEST);
};

const populateDB = () =>{
  return schema.db.populate();
};

const stopDB = () =>{
    return schema.db.disconnect();
};

const cleanDB = () =>{
  return schema.db.clean();
};

const testSetup = () =>{
  beforeAll( async ()=>{
    await startDB();
  });

  afterAll(async ()=>{
    await stopDB();
  });

  afterEach(async ()=>{
    await cleanDB();
  });
};

export default {
  Request,
  Gateway,
  Device,
  serialize: (data) =>{
    return JSON.parse(JSON.stringify(data));
  },
  responseBody: (res) =>{
    return res.body;
  },
  createGateway: (params) =>{
    const gateway = new Gateway(params);
    return gateway.save();
  },
  createDevice: (params) =>{
    const device = new Device(params);
    return device.save();
  },
  startDB,
  stopDB,
  populateDB,
  cleanDB,
  testSetup,
  gatewayParams: {
    serial: "QWERTY",
    name: "America",
    ipv4: "10.0.0.1"
  },
  deviceParams: {
    uid: '45',
    vendor: 'Huawei',
    created: new Date(),
    status: 1
  }
};
