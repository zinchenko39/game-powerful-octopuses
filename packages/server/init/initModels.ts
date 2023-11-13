import { sequelize } from '../db'
import Models from '../models/index'

export default {
  init() {
    sequelize.addModels(Models)
  },
}
