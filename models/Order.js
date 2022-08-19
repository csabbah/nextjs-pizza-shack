import mongoose, { Mongoose } from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxLength: 60,
    },
    address: {
      type: String,
      required: true,
      maxLength: 60,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      // By default, initial state value is 0
      default: 0,
    },
    // payment method
    method: {
      type: Number,
      required: true,
    },
  },
  // This will auto create the time stamp when order is added to database
  { timestamps: true }
);

// If we already have this orders model, do not create it again (use it), else, if there are no models, create new models
export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
