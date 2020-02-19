import Sequelize from 'sequelize';

import Deliverer from '../app/models/Deliverer';
import Recipient from '../app/models/Recipient';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, Recipient, Deliverer];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
