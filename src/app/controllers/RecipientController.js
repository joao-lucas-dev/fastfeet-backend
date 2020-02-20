import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll({
      attributes: [
        'id',
        'name',
        'cpf',
        'street',
        'number',
        'complement',
        'neighborhood',
        'state',
        'city',
        'cep',
      ],
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      neighborhood: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string()
        .required()
        .length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { cpf } = req.body;

    const recipient = await Recipient.findOne({ where: { cpf } });

    if (recipient) {
      return res.status(400).json({ error: 'Recipient already exits!' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      neighborhood,
      state,
      city,
      cep,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      cpf,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      cep,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      neighborhood: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string()
        .length(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { id } = req.params;
    const { cpf } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (recipient.cpf !== cpf) {
      const recipientExists = await Recipient.findOne({ where: { cpf } });

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exits!' });
      }
    }

    const {
      name,
      street,
      number,
      complement,
      neighborhood,
      state,
      city,
      cep,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      cpf,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      cep,
    });
  }
}

export default new RecipientController();
