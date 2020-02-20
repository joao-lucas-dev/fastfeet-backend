import Deliverer from '../models/Deliverer';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

class OrderController {
  async store(req, res) {
    const { recipient_id, deliverer_id } = req.body;

    const recipient = await Recipient.findOne({
      where: {
        id: recipient_id,
      },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const deliverer = await Deliverer.findOne({
      where: {
        id: deliverer_id,
      },
    });

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    const { id, product, start_date, end_date } = await Order.create(req.body);

    return res.json({
      id,
      recipient_id,
      deliverer_id,
      product,
      start_date,
      end_date,
    });
  }
}

export default new OrderController();
