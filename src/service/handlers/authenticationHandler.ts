/* Dependencies */
import { Router, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

/* Models */
import { User } from '../../models'

class AuthenticationHandler {
  router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  init() {
    this.router.post('/', this.authenticate)
  }

  authenticate(req: Request, res: Response) {
    const UserData = req.body

    if (UserData && UserData.email && UserData.password) {
      const { email, password } = UserData

      User.findOne({ where: { email } })
          .then(data => {

            // If we didn't find a user matching the email
            if (!data) return res.status(400).json({ message: 'User not found' })

            const encryptedPassword = data.password

            // Compare plaintext and encrypted passwords
            bcrypt.compare(password, encryptedPassword)
                  .then(valid => {
                    const { dataValues } = data

                    // If the passwords matched
                    if (valid) {
                      let token = jwt.sign({ email: dataValues.email, isAdmin: dataValues.isAdmin }, 'supersecret')
                      res.json({ token }) 
                    }

                    // Otherwise the password was invalid
                    res.status(400).json({ message: 'invalid password'} )
                  })
          })
          .catch(err => {
            // Server error
            res.status(500)
          })
    } else {
      // Not enough info provided
      res.status(400).json({ message: 'must provide an email and password' })
    }
  }
}

export default new AuthenticationHandler().router
