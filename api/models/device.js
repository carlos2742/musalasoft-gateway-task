import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  uid: {
    type: Number,
  },
  vendor: {
    type: String
  },
  created: {
    type: Date
  },
  status: {
    type: String
  },
  gateway: {type: mongoose.Schema.Types.ObjectId, ref: 'Gateway'}
});

const Device = mongoose.model('Device', deviceSchema);

export default Device;
