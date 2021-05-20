import helper from "../helper/index.js";

helper.testSetup();

describe('Method: GET - Route: api/gateways', () => {
  test("It should return a list of gateways", async (done) =>{
    await helper.populateDB();
    const gateways = await helper.Gateway.find();
    const response = await helper.Request.get("/api/gateways");
    const {result} = helper.responseBody(response);

    expect(response.status).toBe(200);
    expect(result.length).toBeGreaterThan(0);
    expect(helper.serialize(gateways)).toEqual(result);
    done();
  });

});

describe('Method: GET - Route: api/gateways/:gatewayId', () => {
  test("It should return a gateway", async (done) =>{
    await helper.populateDB();
    const gateway = await helper.Gateway.findOne();
    const response = await helper.Request.get(`/api/gateways/${gateway.id}`);
    const {result} = helper.responseBody(response);

    expect(response.status).toBe(200);
    expect(helper.serialize(gateway)).toEqual(result);
    done();
  });
});

describe('Method: POST - Route: api/gateways/', () => {
  test("It should create new gateway", async (done) =>{
    const response = await helper.Request.post('/api/gateways').send(helper.gatewayParams);
    const {result} = helper.responseBody(response);
    const gateways = await helper.Gateway.find();

    expect(response.status).toBe(201);
    expect(gateways.length).toBeGreaterThan(0);
    expect(helper.serialize(gateways[0])).toEqual(result);
    done();
  });

  test("It should not create new gateway with existing serial", async (done) =>{
    await helper.createGateway(helper.gatewayParams);
    const response = await helper.Request.post('/api/gateways').send(helper.gatewayParams).expect(500);
    const gatewayLen = await helper.Gateway.countDocuments();
    const {message} = helper.responseBody(response);

    expect(response.status).toBe(500);
    expect(message).toEqual("Gateway serial must be unique.");
    expect(gatewayLen).toEqual(1);
    done();
  });
});

describe('Method: PUT - Route: api/gateways/:gatewayId', () => {
  test("It should update a gateway", async (done) =>{
    const params = helper.gatewayParams;
    const currentIpv4 = params.ipv4;
    let gateway = await helper.createGateway(params);

    expect(gateway.ipv4).toMatch(currentIpv4);

    params.ipv4 = '192.168.120.2';
    const response = await helper.Request.put(`/api/gateways/${gateway.id}`).send(params);
    gateway = await helper.Gateway.findOne();

    const gatewayLen = await helper.Gateway.countDocuments();

    expect(response.status).toBe(200);
    expect(gateway.ipv4).not.toMatch(currentIpv4);
    expect(gatewayLen).toBe(1);
    done();
  });

  test("It should not update a gateway with existing serial", async (done) =>{
    const params = helper.gatewayParams;
    const newParams = {...params, serial: '123w'};

    await helper.createGateway(params);
    const gateway2 = await helper.createGateway(newParams);
    const gatewayLen = await helper.Gateway.countDocuments();

    expect(gatewayLen).toBe(2);

    const response = await helper.Request.put(`/api/gateways/${gateway2.id}`).send(params);
    const {message} = helper.responseBody(response);

    expect(response.status).toBe(500);
    expect(message).toMatch("Gateway serial must be unique.");
    done();
  });

});

describe('Method: DELETE - Route: api/gateways/:gatewayId', () => {
  test("It should delete a gateway", async (done) =>{
    const gateway = await helper.createGateway(helper.gatewayParams);
    let gatewayCount = await helper.Gateway.countDocuments();

    expect(gatewayCount).toBeGreaterThan(0);

    const response = await helper.Request.delete(`/api/gateways/${gateway.id}`);
    gatewayCount = await helper.Gateway.countDocuments();

    expect(gatewayCount).toBe(0);
    expect(response.status).toBe(200);
    done();
  });

});

/*--------------------------------------------Devices--------------------------------------------*/

describe('Method: GET - Route: api/gateways/:gatewayId/devices', () => {
  test("It should return a list of devices", async (done) =>{
    await helper.populateDB();
    const gateway = await helper.Gateway.findOne();
    const devices = await helper.Device.find({gateway:gateway.id});
    const response = await helper.Request.get(`/api/gateways/${gateway.id}/devices`);
    const {result} = helper.responseBody(response);

    expect(response.status).toBe(200);
    expect(result.length).toBeGreaterThan(0);
    expect(helper.serialize(devices)).toEqual(result);
    done();
  });

});

describe('Method: POST - Route: api/gateways/:gatewayId/device', () => {
  test("It should create new devices", async (done) =>{
    const gateway = await helper.createGateway(helper.gatewayParams);
    const response = await helper.Request.post(`/api/gateways/${gateway.id}/device`).send(helper.deviceParams);
    const {result} = helper.responseBody(response);
    const devices = await helper.Device.find({gateway: gateway.id});

    expect(response.status).toBe(201);
    expect(devices.length).toBeGreaterThan(0);
    expect(helper.serialize(devices[0])).toEqual(result);
    done();
  });

});
