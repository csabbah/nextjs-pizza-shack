import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // Max length 60 characters
      maxLength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    sizes: {
      type: [Number],
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      //  An array of objects with text and price
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  // This will auto create the time stamp when product is added to database
  { timestamps: true }
);

// If we already have this products model, do not create it again (use it), else, if there are no models, create new models
export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
