/* Dependencies */
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

class AuthMiddleware {
  static verifyAdmin(req: Request, res: Response, next: NextFunction) {
    const authToken = req.get('auth')

    if (!authToken) return res.status(400).json({ message: 'Must provide an authentication token' })

    try {
      const decodedJWT = jwt.verify(authToken, 'supersecret')

      // If the user is an admin, move on
      if (decodedJWT.isAdmin) {
        next()
      } else {
        res.status(400).json({ message: 'Must be an admin to perform this action' })
      }
    } catch (e) {
      res.status(400).json({ message: 'Invalid JWT' })
    }

  }
}

export default AuthMiddleware
