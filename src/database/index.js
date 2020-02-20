import Sequelize from 'sequelize';

import Avatar from '../app/models/Avatar';
import Deliverer from '../app/models/Deliverer';
import Order from '../app/models/Order';
import Recipient from '../app/models/Recipient';
import Signature from '../app/models/Signature';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, Recipient, Deliverer, Avatar, Signature, Order];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
