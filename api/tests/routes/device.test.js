import helper from "../helper/index.js";

helper.testSetup();

describe('Method: GET - Route: api/devices/:deviceId', () => {
  test("It should return a device", async (done) =>{
    await helper.populateDB();
    const device = await helper.Device.findOne();

    const response = await helper.Request.get(`/api/devices/${device.id}`);
    const {result} = helper.responseBody(response);

    expect(response.status).toBe(200);
    expect(helper.serialize(device)).toEqual(result);
    done();
  });
});

describe('Method: PUT - Route: api/devices/:deviceId', () => {

  test("It should update a device", async (done) =>{
    const params = helper.deviceParams;
    const currentVendor = params.vendor;
    const gateway = await helper.createGateway(helper.gatewayParams);
    let device = await helper.createDevice({...helper.deviceParams, gateway: gateway.id});

    expect(device.vendor).toMatch(currentVendor);

    params.vendor = 'Cisco';
    const response = await helper.Request.put(`/api/devices/${device.id}`).send(params);
    device = await helper.Device.findOne();

    const deviceLen = await helper.Device.countDocuments();

    expect(response.status).toBe(200);
    expect(device.vendor).not.toMatch(currentVendor);
    expect(deviceLen).toBe(1);
    done();
  });

});

describe('Method: DELETE - Route: api/devices/:deviceId', () => {

  test("It should delete a device", async (done) =>{
    const gateway = await helper.createGateway(helper.gatewayParams);
    const device = await helper.createDevice({...helper.deviceParams, gateway: gateway.id});
    let deviceLen = await helper.Device.countDocuments();

    expect(deviceLen).toBeGreaterThan(0);

    const response = await helper.Request.delete(`/api/devices/${device.id}`);
    deviceLen = await helper.Device.countDocuments();

    expect(response.status).toBe(200);
    expect(deviceLen).toBe(0);
    done();
  });
});
