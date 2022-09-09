import dbConnect from '../../../utils/mongo';
import Order from '../../../models/Order';

const handler = async (req, res) => {
  // Establish DB connection
  await dbConnect();

  // Extract request method, query returns id 'orders/"203faangwoeiwecas"'
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

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
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated');
    }

    try {
      await Order.findByIdAndDelete(id);
      res.status(201).json('The product has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
