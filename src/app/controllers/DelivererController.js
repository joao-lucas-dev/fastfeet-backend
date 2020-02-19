import * as Yup from 'yup';

import Deliverer from '../models/Deliverer';

class DelivererController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { email } = req.body;

    const deliverer = await Deliverer.findOne({ where: { email } });

    if (deliverer) {
      return res.status(400).json({ error: 'Deliverer already exists!' });
    }

    const { id, name } = await Deliverer.create(req.body);

    return res.json({ id, name, email });
  }
}

export default new DelivererController();
