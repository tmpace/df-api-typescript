/* Dependencies */
import * as Sequelize from 'sequelize';

/**
 * Creates a User model in the database
 * @param {DatabaseConnection} db 
 * @return {Model} User
 */
function DefineUser(db) {
  const User = db.define('user', {
    email: { 
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: validateUniqueEmail
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    firstName: { 
      type: Sequelize.STRING,
      allowNull: false
    },
     
    lastName: { 
      type: Sequelize.STRING,
      allowNull: false
    },

    organization: { 
      type: Sequelize.STRING
    },

    phoneNumber: { 
      type: Sequelize.STRING,
      allowNull: false
    },

    planID: { 
      type: Sequelize.STRING,
      allowNull: false
    },

    isAdmin: { 
      type: Sequelize.BOOLEAN,
      defaultValue: false
    } 
  })

  /**
   * Validates a unique email address before creating a user
   * @param {String} value 
   * @param {Function} next
   */
  function validateUniqueEmail(value: String, next: Function) {
    User.find({ where: {email: value}})
        .then((user) => {
          if (user) {
            return next('Email address is already in use')
          }

          return next()
        })
        .catch((err) => {
          return next(err)
        })
  }

  return User
}


export default DefineUser
