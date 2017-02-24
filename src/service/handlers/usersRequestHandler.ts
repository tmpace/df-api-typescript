/* Dependenies */
import { Router, Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as sequelize from 'sequelize'
import * as jwt from 'jsonwebtoken'

/* Middleware */
import AuthMiddleware from '../middleware/authMiddleware'

/* Models */
import { User } from '../../models'

class UsersRequestHandler {
  router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  /**
   * Initialize routes for /users
   */
  init(): void {
    this.router.get('/', AuthMiddleware.verifyAdmin, this.getUsers)
    this.router.post('/', AuthMiddleware.verifyAdmin, this.addUser)
  }

  /**
   * Gets a list of all users from the database
   * @param {Request} req 
   * @param {Response} res
   */
  getUsers(req: Request, res: Response) {
    User.findAll()
        .then(data => res.json(data))
        .catch(err => res.status(500).end())
  }

  /**
   * Adds an individual user to the database
   * @param {Request} req
   * @param {Response} res
   */
  addUser(req: Request, res: Response) {
    const UserData = req.body

    if (UserData && UserData.email && UserData.password) {
      const { password } = UserData

      // Encrypt user password
      bcrypt.hash(password, 10).then(hash => {
        UserData.password = hash
        
        // Save user
        User.create(UserData)
            .then(data => { 
              res.json(data) 
            })
            .catch(sequelize.ValidationError, err => { 
              // Handle errors
              let errors = err.errors.map(err => ({ message: err.message }) )

              res.status(400).json(errors) 
            })
      })
    } else {
      // Not enough user info was provided
      res.status(400).json({ error: 'User data not provided' })
    }
  }
}

export default new UsersRequestHandler().router
