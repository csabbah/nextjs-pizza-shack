import dbConnect from '../../../utils/mongo';
import Order from '../../../models/Order';

const handler = async (req, res) => {
  // Establish DB connection
  dbConnect();

  // Extract request method, query returns id 'orders/"203faangwoeiwecas"'
  const {
    method,
    query: { id },
  } = req;

  if (method === 'GET') {
    try {
      // --------- Method 1
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method == 'PUT') {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        // 'new: true' == Return newest version of the data
        new: true,
      });
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method == 'DELETE') {
  }
};

export default handler;
