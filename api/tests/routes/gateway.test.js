import helper from "../helper/helper.js";

helper.testSetup();

describe('Route GET method api/gateways', () => {

  test("It should response with 200", async () =>{
    return helper.request.get("/api/gateways").expect(200);
  });

  test("It should return a list of gateways", async () =>{
    await helper.populateDB();

    const gateways = JSON.stringify(await helper.models.Gateway.find());
    const response = await helper.request.get("/api/gateways");
    const {result} = response.body;
    expect(result.length).toBeGreaterThan(0);
    expect(JSON.parse(gateways)).toEqual(result);
  });

});
