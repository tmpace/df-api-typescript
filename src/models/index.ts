/* Dependencies */
import * as Sequelize from 'sequelize'

/* Model Definitions */
import DefineUser from './user'

// Create DB Connection
export const db = new Sequelize(
  'datafiniti', 
  'datafiniti', 
  'datafiniti', 
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    port: 3306
  }
)

// Create User Model
export const User = DefineUser(db)

