import * as Yup from 'yup';

import Avatar from '../models/Avatar';
import Deliverer from '../models/Deliverer';

class DelivererController {
  async index(req, res) {
    const delieverers = await Deliverer.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(delieverers);
  }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const deliverer = await Deliverer.findByPk(id);

    if (deliverer.email !== email) {
      const checkEmailDeliverer = await Deliverer.findOne({ where: { email } });

      if (checkEmailDeliverer) {
        return res.status(400).json({ error: 'Deliverer already exists!' });
      }
    }

    const { name, avatar_id } = await deliverer.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }
}

export default new DelivererController();
