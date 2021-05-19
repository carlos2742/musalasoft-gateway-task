import schema from "./index.js";
const seed = async() => {
  const gateway1 = new schema.models.Gateway({
    serial: '537G',
    name: 'Europe',
    ipv4: '10.0.0.1',
  });

  const gateway2 = new schema.models.Gateway({
    serial: '79HX',
    name: 'America',
    ipv4: '10.0.0.2',
  });

  const device1 = new schema.models.Device({
    uid: 1,
    vendor: 'Huawei',
    created: new Date(),
    status: 'online',
    gateway: gateway1.id,
  });

  const device2 = new schema.models.Device({
    uid: 2,
    vendor: 'Cisco',
    created: new Date(),
    status: 'offline',
    gateway: gateway1.id,
  });


  const device3 = new schema.models.Device({
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
};

export default seed;
