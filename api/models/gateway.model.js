import mongoose from 'mongoose';

const gatewaySchema = new mongoose.Schema({
  serial: {
    type: String,
    unique: true,
  },
  name: {
    type: String
  },
  ipv4: {
    type: String
  }
});

gatewaySchema.pre('remove', (next) => {
  this.model('Device').deleteMany({ gateway: this._id }, next);
});

const Gateway = mongoose.model('Gateway', gatewaySchema);

export default Gateway;
