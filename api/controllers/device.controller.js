import schema from "../models/index.js";

const Device = schema.models.Device;

const deviceId = (req)=>{
  return req.params['deviceId'];
};

export default {
  findById:(req, res) =>{
    Device.findById(deviceId(req),(err,result)=>{
      if (err) return next(err);
      res.status(200).send({status:'success', result:result});
    });
  },
  update:(req, res) =>{
    const data = req.body;
    Device.updateOne({_id:deviceId(req)}, data).then(
      result =>{
        res.status(200).send({status:'success', result:result});
      }, error =>{
        res.send({status:'error', message: error['errmsg']});
      });
  },
  delete: (req, res) =>{
    Device.deleteOne({_id:deviceId(req)},(err,result)=>{
      if (err) return next(err);
      res.status(200).send({status:'success', result:result});
    });
  }
}
