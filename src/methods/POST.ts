import { DatabaseUser } from "../data/usersStorageProccess";
import { IncomingMessage, ServerResponse } from 'http'
import { isCorrectUserBodyFormat } from "../utils/isCorrectUserBodyFormat";
import { createNewUSer } from "../utils/createNewUser";
import cluster from "cluster";
import { STATUS_CODE, ERROR_MESSAGE } from "../types/types";



export function servePostRequest(req: IncomingMessage,res: ServerResponse,users: Record<string, any>) {
   if(cluster.isWorker){
             
                    users = users.data
          }
    let body = '';

  req.on('data', (chunk:Buffer) => {
    body += chunk.toString();
  });

   
    req.on('end', () => {
       try {
      const userData = JSON.parse(body);
      let newObj: DatabaseUser = {
        userId: '',
        username: "",
        age: 0,
        hobbies: [],
      }
      
      if(isCorrectUserBodyFormat(userData)){
          let newUser = createNewUSer(newObj,userData)
          users.unshift(newUser);
           if(cluster.isWorker){
              
            process.send && process.send({ type: 'sharedMemoryUpdate', data: users })
          }
          console.log(users);
          res.statusCode = STATUS_CODE.OK;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ message: 'User added successfully' }));

      }else{
          res.statusCode = STATUS_CODE.BAD_REQUEST;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: ERROR_MESSAGE.INVALID_DATA }));
          
        }
    } catch (error) {
        console.error('Error parsing request body:', error);

      res.statusCode = STATUS_CODE.BAD_REQUEST;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Error' }));
    }
    })
}