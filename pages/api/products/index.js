import dbConnect from '../../../utils/mongo';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  // Establish DB connection
  dbConnect();

  // Extract request method
  const { method } = req;

  if (method === 'GET') {
    try {
      // --------- Method 1
      const products = await Product.find();
      res.status(200).json(products);
      // --------- Method 2
      // Product.find({}).then((productsData) => {
      //   res.json(productsData);
      // });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === 'POST') {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
