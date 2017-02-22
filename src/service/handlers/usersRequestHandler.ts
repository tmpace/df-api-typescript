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

  init(): void {
    this.router.get('/', this.getUsers)
    this.router.post('/', AuthMiddleware.verifyAdmin, this.addUser)
  }

  getUsers(req: Request, res: Response) {
    User.findAll()
        .then(data => res.json(data))
        .catch(err => res.status(500).end())
  }

  addUser(req: Request, res: Response) {
    const UserData = req.body

    if (UserData && UserData.email && UserData.password) {
      const { password } = UserData

      bcrypt.hash(password, 10).then(hash => {
        UserData.password = hash
        
        User.create(UserData)
            .then(data => res.json(data))
            .catch(sequelize.ValidationError, err => { 
              let errors = err.errors.map(err => ({ message: err.message }) )

              res.status(400).json(errors) 
            })
      })
    } else {
      res.status(400).json({ error: 'user data not provided' })
    }
  }
}

export default new UsersRequestHandler().router
