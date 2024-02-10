import 'dotenv/config'
import { IncomingMessage, createServer } from "node:http";
import { users } from "./data/users";
import { serveGetRequest } from "./methods/GET";
import { servePostRequest } from "./methods/POST";
import { servePut } from "./methods/PUT";
import { serveDelete } from "./methods/DELETE";
import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';





if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < availableParallelism(); i++) {
    
    const worker = cluster.fork();
    worker.send(i);
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  let counter = 0
  process.on('message', (msg:number) => {
    //console.log(msg, 'message')
    counter += msg
    //console.log(counter, 'counteer')
    const port = parseInt(process.env.PORT) + counter
    const server = createServer((req, res) => {
      const urlParts = req?.url.split("/");
      const userId = urlParts[urlParts.length - 1];
      if (req.method === "GET") {
        try{
          
          serveGetRequest(req, res, userId, users);
        }catch(err){
           res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again" }));
        }
      }else if(req.method === 'POST' && req.url === '/api/users'){
        try{
    
          servePostRequest(req,res)
        }catch(err){
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again" }));
        }
      }else if(req.method === 'PUT' && req.url === `${`/api/users/${userId}`}`){
        try{
    
          servePut(req,res,userId)
        }catch(err){
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again" }));
        }
      }else if(req.method === 'DELETE' && req.url ===`/api/users/${userId}`){
        try{
    
          serveDelete(req,res,userId)
        }catch(err){
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again!" }));
        }
      }
    });
    server.listen(port, () => console.log(`server running on ${port}`));
    console.log(`Worker ${process.pid} started`);
  });
  


}




