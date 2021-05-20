import schema from "../models/index.js";

const Gateway = schema.models.Gateway;
const Device = schema.models.Device;

const gatewayId = (req)=>{
  return req.params['gatewayId'];;
};

export default {
  findAll:(req, res) =>{
    Gateway.find((err,result)=>{
      if (err) return next(err);
      res.status(200).send({status:'success', result:result});
    });
  },
  findById:(req, res) =>{
    Gateway.findById(gatewayId(req),(err,result)=>{
      if (err) return next(err);
      res.status(200).send({status:'success', result:result});
    });
  },
  create:(req, res) =>{
    const obj = new Gateway(req.body);
    obj.save().then(
      (result) =>{
        res.status(201).send({status:'success', result:result});
      },(error)=>{
        const response = {status:'danger', message: ''};
        error['code'] === 11000 ? response.message = 'Gateway serial must be unique.' : response.message = error['errmsg'];
        res.status(500).send(response);
      });
  },
  update:(req, res) =>{
    const data = req.body;
    Gateway.updateOne({_id:gatewayId(req)}, data).then(
      (result) =>{
        res.status(200).send({status:'success', result:result});
      }, (error)=>{
        const response = {status:'danger', message: ''};
        error['code'] === 11000 ? response.message = 'Gateway serial must be unique.' : response.message = error['errmsg'];
        res.status(500).send(response);
      });
  },
  delete:(req, res) =>{
    Gateway.deleteOne({_id:gatewayId(req)},(err,result)=>{
      if (err) return next(err);
      res.status(200).send({status:'success', result:result});
    });
  },
  /*--------------------------------------------Devices--------------------------------------------*/
  allDevices:(req, res) =>{
    Device.find({gateway: gatewayId(req)},(err,result) => {
      if (err) return next(err);
      res.status(200).send({status:'success', result:result});
    });
  },
  addDevice:(req, res) =>{
    const data = req.body;
    data['gateway'] = gatewayId(req);
    const device = new Device(req.body);
    device.save().then(
      result =>{
        res.status(201).send({status:'success', result:result});
      },error=>{
        res.status(500).send({status:'error', message: error['errmsg']});
      });
  }
}
