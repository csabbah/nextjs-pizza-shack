import dbConnect from '../../../utils/mongo';
import storeSchema from '../../../models/Store';

export default async function handler(req, res) {
  // Establish DB connection
  await dbConnect();

  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  // THIS WORKS
  if (method === 'GET') {
    try {
      // --------- Method 1
      const store = await storeSchema.find();
      res.status(200).json(store);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    // if (!token || token !== process.env.TOKEN) {
    //   return res.status(401).json('Not authenticated');
    // }
    try {
      const store = await storeSchema.create(req.body);
      res.status(201).json(store);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    try {
      await storeSchema.findOneAndDelete();
      res.status(201).json('The product has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
