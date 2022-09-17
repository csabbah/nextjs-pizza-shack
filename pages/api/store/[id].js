import dbConnect from '../../../utils/mongo';
import storeSchema from '../../../models/Store';

export default async function handler(req, res) {
  // Establish DB connection
  await dbConnect();

  // Extract request method, query returns id 'product/"203faangwoeiwecas"'
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  if (method === 'DELETE') {
    try {
      await storeSchema.findByIdAndDelete(id);
      res.status(201).json('The Image has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
