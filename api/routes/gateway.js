import express from 'express';
import Gateway from '../controllers/gateway.controller.js';

const router = express.Router();

/* GET gateways listing. */
router.get('/', Gateway.findAll);

/* GET gateway by id. */
router.get('/:gatewayId', Gateway.findById);

/* POST add gateway. */
router.post('/',Gateway.create);

/* PUT edit gateways. */
router.put('/:gatewayId',Gateway.update);

/* DELETE gateway. */
router.delete('/:gatewayId',Gateway.delete);

/*--------------------------------------------Devices--------------------------------------------*/

/* GET devices listing. */
router.get('/:gatewayId/devices', Gateway.allDevices);

/* POST add devices. */
router.post('/:gatewayId/device', Gateway.addDevice);

export default router;
