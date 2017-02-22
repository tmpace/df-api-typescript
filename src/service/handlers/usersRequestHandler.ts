/* Dependenies */
import { Router, Request, Response } from 'express'
import * as sequelize from 'sequelize'

/* Model Imports */
import { User } from '../../models'

class UsersRequestHandler {
  router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  init(): void {
    this.router.get('/', this.getUsers)
    this.router.post('/', this.addUser)
  }

  getUsers(req: Request, res: Response) {
    User.findAll()
        .then(data => res.json(data))
        .catch(err => res.status(500).end())
  }

  addUser(req: Request, res: Response) {
    const UserData = req.body || null

    if (UserData) {
      User.create(UserData)
          .then(data => res.json(data))
          .catch(sequelize.ValidationError, err => res.status(400).end())
          .catch(err => res.status(400).end())
    } else {
      res.status(400).end()
    }
  }
}

export default new UsersRequestHandler().router
