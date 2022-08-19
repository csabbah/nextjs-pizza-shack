import dbConnect from '../../../utils/mongo';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  // Establish DB connection
  dbConnect();

  // Extract request method, query returns id 'product/"203faangwoeiwecas"'
  const {
    method,
    query: { id },
  } = req;

  if (method === 'GET') {
    try {
      // --------- Method 1
      const product = await Product.findById(id);
      res.status(200).json(product);
      // --------- Method 2
      // Product.find({}).then((productsData) => {
      //   res.json(productsData);
      // });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === 'PUT') {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
