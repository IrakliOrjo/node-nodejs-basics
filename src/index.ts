import 'dotenv/config'
import { IncomingMessage, createServer } from "node:http";
import { users } from "./src/data/users";
import { serveGetRequest } from "./src/methods/GET";
import { servePostRequest } from "./src/methods/POST";
import { servePut } from "./src/methods/PUT";
import { serveDelete } from "./src/methods/DELETE";


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

server.listen(process.env.PORT, () => console.log(`server running on ${process.env.PORT}`));

console.log(`HEY ${process.env.HELLO}`);
