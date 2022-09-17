import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  url: String,
});

// If we already have this featured model, do not create it again (use it), else, if there are no models, create new models
export default mongoose.models.Store || mongoose.model('Store', storeSchema);
