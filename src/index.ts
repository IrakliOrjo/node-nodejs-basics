import 'dotenv/config'
import { createServer } from "node:http";
import { serveGetRequest } from "./methods/GET";
import { servePostRequest } from "./methods/POST";
import { servePut } from "./methods/PUT";
import { serveDelete } from "./methods/DELETE";
import { users } from './data/usersStorageProccess';


const server = createServer((req, res) => {
      const urlParts = req?.url?.split("/");
      const userId = urlParts && urlParts[urlParts.length - 1];
      if (req.method === "GET") {
        try{
          
          serveGetRequest(req, res, userId, users);
        }catch(err){
           res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again" }));
        }
      }else if(req.method === 'POST' && req.url === '/api/users'){
        try{
    
          servePostRequest(req,res,users)
        }catch(err){
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again" }));
        }
      }else if(req.method === 'PUT' && req.url === `${`/api/users/${userId}`}`){
        try{
    
          servePut(req,res,userId,users)
        }catch(err){
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again" }));
        }
      }else if(req.method === 'DELETE' && req.url ===`/api/users/${userId}`){
        try{
    
          serveDelete(req,res,userId,users) 
        }catch(err){
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Sorry for inconvenience, please try again!" }));
        }
      }
    });
    server.listen(process.env.PORT, () => console.log(`Worker server running on ${process.env.PORT}`));

