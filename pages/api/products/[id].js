import dbConnect from '../../../utils/mongo';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  // Establish DB connection
  dbConnect();

  // Extract request method, query returns id 'product/"203faangwoeiwecas"'
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

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
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated');
    }

    try {
      const product = await Product.findByIdAndUpdate(id);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated');
    }

    try {
      await Product.findByIdAndDelete(id);
      res.status(201).json('The product has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
