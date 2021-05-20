import express from 'express';

import Gateway from "../models/gateways.js";
import Device from "../models/device.js";

const router = express.Router();

/* GET gateways listing. */
router.get('/', (req, res) => {
  Gateway.find((err,result)=>{
    if (err) return next(err);
    res.status(200).send({status:'success', result:result});
  });
});

/* GET gateway by id. */
router.get('/:gatewayId', function(req, res, next) {
  const id = req.params['gatewayId'];
  Gateway.findById(id,(err,result)=>{
    if (err) return next(err);
    res.status(200).send({status:'success', result:result});
  });
});

/* POST add gateway. */
router.post('/', function(req, res, next) {
  const gateway = new Gateway(req.body);
  gateway.save().then(
    (result) =>{
      res.status(201).send({status:'success', result:result});
    },(error)=>{
      const response = {status:'danger', message: ''};
      error['code'] === 11000 ? response.message = 'Gateway serial must be unique.' : response.message = error['errmsg'];
      res.send(response);
    });
});

/* PUT edit gateways. */
router.put('/:gatewayId', function(req, res, next) {
  const id = req.params['gatewayId'];
  const data = req.body;
  Gateway.updateOne({_id:id}, data).then(
    (result) =>{
      res.status(200).send({status:'success', result:result});
    }, (error)=>{
      const response = {status:'danger', message: ''};
      error['code'] === 11000 ? response.message = 'Gateway serial must be unique.' : response.message = error['errmsg'];
      res.send(response);
    });
});

/* DELETE gateway. */
router.delete('/:gatewayId', function(req, res, next) {
  const id = req.params['gatewayId'];
  Gateway.deleteOne({_id:id},(err,result)=>{
    if (err) return next(err);
    res.status(200).send({status:'success', result:result});
  });
});

/*--------------------------------------------Devices--------------------------------------------*/

/* GET devices listing. */
router.get('/:gatewayId/devices', function(req, res, next) {
  const id = req.params['gatewayId'];
  Device.find({gateway: id},(err,result) => {
    if (err) return next(err);
    res.status(200).send({status:'success', result:result});
  });
});

/* POST add devices. */
router.post('/:gatewayId/device', function(req, res, next) {
  const data = req.body;
  data['gateway'] = req.params['gatewayId'];
  const device = new Device(req.body);
  device.save().then(
    result =>{
      res.status(201).send({status:'success', result:result});
    },error=>{
      res.send({status:'error', message: error['errmsg']});
    });
});

export default router;
