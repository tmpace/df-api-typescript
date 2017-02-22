/* Dependencies */
import * as Sequelize from 'sequelize'

/* Model Definitions */
import DefineUser from './user'

// Create DB Connection
export const db = new Sequelize(
  'datafiniti', 
  'root', 
  null, 
  {
    dialect: 'mysql',
    port: 3306
  }
)

// Create User Model
export const User = DefineUser(db)

