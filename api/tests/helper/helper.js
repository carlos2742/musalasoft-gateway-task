import app from "../../app.js";
import supertest  from "supertest";
import schema from "../../models";


const request = supertest(app);
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

const helper = {
  request,
  startDB,
  stopDB,
  populateDB,
  cleanDB,
  testSetup,
  models: schema.models
};

export default helper;
