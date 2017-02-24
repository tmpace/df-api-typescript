/* Dependencies */
import * as Sequelize from 'sequelize'

/* Model Definitions */
import DefineUser from './user'

// Create and export a database connection
export const db = new Sequelize('datafiniti', 'datafiniti', 'datafiniti', 
  {
    logging: false,
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    port: 3306
  }
)

// Create User Model
export const User = DefineUser(db)

