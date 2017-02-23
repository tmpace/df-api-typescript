/* Dependencies */
import * as express from 'express'
import { db } from '../models'

/* Middleware */
import * as bodyParser from 'body-parser'

/* Request Handlers */
import UsersRequestHandler from './handlers/usersRequestHandler'
import AuthenticationHandler from './handlers/authenticationHandler'

class Server {
  private app: express.Application

  constructor() {
    this.app = express()
  }

  private routes(): void {
    this.app.use('/users', UsersRequestHandler)
    this.app.use('/auth', AuthenticationHandler)
  }

  private connectDB(): void {
    db.sync().then(() => {
      console.log('Successfully connected to DB')
    })
    .catch(e => {
      console.log('Error connecting to DB, retrying in 5s', e)

      setTimeout(() => this.connectDB(), 5000)
    })
  }

  private middleware(): void {
    this.app.use(bodyParser.json())
  }

  public start(): void {
    // Sync with DB and then start the server
    this.connectDB()
    this.middleware()
    this.routes()
    this.app.listen('8000', () => console.log('App listening on port 3000'))
  }
}

export default new Server()
