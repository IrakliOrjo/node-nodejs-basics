import 'dotenv/config'
import { IncomingMessage, ServerResponse, createServer } from "node:http";
import { serveGetRequest } from "./methods/GET";
import { servePostRequest } from "./methods/POST";
import { servePut } from "./methods/PUT";
import { serveDelete } from "./methods/DELETE";
import { availableParallelism } from 'node:os';
import cluster,{ Worker } from 'node:cluster';
import { users } from "./data/usersStorageProccess";



export interface ProcessEnv {
    [key: string]: string | undefined
}

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  const sharedMemory = { data: users}
  for (let i = 0; i < availableParallelism(); i++) {
    
    const worker = cluster.fork();
    worker.send({type: 'sharedMemoryUpdate', data: sharedMemory});
  }
  cluster.on('message', (worker, message) => {
        if (message.type === 'sharedMemoryUpdate') {
            console.log('Received shared memory update from worker:', message.data);
            sharedMemory.data = message.data;
            for (const id in cluster.workers) {
            const worker = cluster.workers[id];
    
          worker && worker.send({ type: 'sharedMemoryUpdate', data: sharedMemory });
  }
        }
    });
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork()
  });


} else {
  let counter = 0
  let sharedMemory: Record<string, any>
 
    //console.log(msg, 'message')
   
    //console.log(counter, 'counteer')
    process.on('message', (message: any) => {
        if (message.type === 'sharedMemoryUpdate') {
            // Access shared memory object received from master
            sharedMemory = message.data;
            console.log('Worker received shared memory:', sharedMemory);

            // Simulate modification of shared memory
            //sharedMemory.data = 'modified data';

            // Send back the updated shared memory to the master
            //process.send({ type: 'sharedMemoryUpdate', data: sharedMemory.data });
        }
    });
    const port = parseInt(process.env.PORT!) + (cluster.worker as Worker).id - 1
    //console.log(port,'poort')
    const server = createServer((req, res) => {
      const urlParts = req?.url?.split("/");
      const userId = urlParts && urlParts[urlParts.length - 1];
      if (req.method === "GET") {
        try{
          
          serveGetRequest(req,res, userId, sharedMemory);
        }catch(err){
           res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again" }));
        }
      }else if(req.method === 'POST' && req.url === '/api/users'){
        try{
    
          servePostRequest(req,res,sharedMemory)
        }catch(err){
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again" }));
        }
      }else if(req.method === 'PUT' && req.url === `${`/api/users/${userId}`}`){
        try{
    
          servePut(req,res,userId,sharedMemory)
        }catch(err){
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again" }));
        }
      }else if(req.method === 'DELETE' && req.url ===`/api/users/${userId}`){
        try{
    
          serveDelete(req,res,userId,sharedMemory) 
        }catch(err){
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again!" }));
        }
      }
    });
    server.listen(port, () => console.log(`Worker server running on ${port}`));
    console.log(`Worker ${process.pid} started`);
}




