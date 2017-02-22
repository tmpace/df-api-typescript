/* Dependencies */
import * as cluster from 'cluster'
import * as os from 'os'

import Server from './service/server'

const numCPUs = os.cpus().length

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  // Fork Workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  Server.start();
  console.log(`Worker ${process.pid} started`)
}

