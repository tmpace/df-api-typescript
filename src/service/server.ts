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

  /**
   * Sets up our application routes
   */
  private routes(): void {
    this.app.use('/users', UsersRequestHandler)
    this.app.use('/auth', AuthenticationHandler)
  }

  /**
   * Syncs with database,
   * retry until connected.
   */
  private connectDB(): void {
    db.sync().then(() => {
      console.log('Successfully connected to Database')
    })
    .catch(e => {
      console.log('Error connecting to DB, retrying in 5s')

      setTimeout(() => this.connectDB(), 5000)
    })
  }

  /**
   * Set up application middleware
   */
  private middleware(): void {
    this.app.use(bodyParser.json())
  }

  /**
   * Boostraps our server and starts the process
   */
  public start(): void {
    this.connectDB()
    this.middleware()
    this.routes()
    this.app.listen('8000', () => console.log('App listening on port 8000'))
  }
}

export default new Server()
