import express from 'express';

import Device from "../controllers/device.controller.js";

const router = express.Router();

/* GET device by id. */
router.get('/:deviceId', Device.findById);

/* PUT edit device. */
router.put('/:deviceId', Device.update);

/* DELETE device. */
router.delete('/:deviceId', Device.delete);

export default router;
