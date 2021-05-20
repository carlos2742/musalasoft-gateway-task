import express from 'express';

import Device from "../models/device.js";

const router = express.Router();

/* GET device by id. */
router.get('/:deviceId', function(req, res, next) {
  const id = req.params['deviceId'];
  Device.findById(id,(err,result)=>{
    if (err) return next(err);
    res.status(200).send({status:'success', result:result});
  });
});

/* PUT edit device. */
router.put('/:deviceId', function(req, res, next) {
  const id = req.params['deviceId'];
  const data = req.body;
  Device.updateOne({_id:id}, data).then(
    result =>{
      res.status(200).send({status:'success', result:result});
    }, error =>{
      res.send({status:'error', message: error['errmsg']});
    });
});

/* DELETE device. */
router.delete('/:deviceId', function(req, res, next) {
  const id = req.params['deviceId'];
  Device.deleteOne({_id:id},(err,result)=>{
    if (err) return next(err);
    res.status(200).send({status:'success', result:result});
  });
});

export default router;
