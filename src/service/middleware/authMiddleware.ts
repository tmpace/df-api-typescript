/* Dependencies */
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

class AuthMiddleware {

  /**
   * Verifies that a user is an admin
   * @param {Request} req 
   * @param {Response} res
   * @param {NextFunction} next
   */
  static verifyAdmin(req: Request, res: Response, next: NextFunction) {
    // Grab the auth token from request headers
    const authToken = req.get('auth')

    // No auth token was provided
    if (!authToken) return res.status(400).json({ message: 'Must provide an authentication token' })

    try {
      // Decode JWT
      const decodedJWT = jwt.verify(authToken, 'supersecret')

      if (decodedJWT.isAdmin) {
        // Confirmed admin
        next()
      } else {
        // Not an admin
        res.status(400).json({ message: 'Must be an admin to perform this action' })
      }
    } catch (e) {
      // JWT Decode Failed
      res.status(400).json({ message: 'Invalid JWT' })
    }

  }
}

export default AuthMiddleware
