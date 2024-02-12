import { IncomingMessage, ServerResponse } from "http";
import { isValidUUID } from "../utils/isValidUserId";
import { updateUser } from "../utils/updateUser";
import { DatabaseUser } from "../data/usersStorageProccess";
import cluster from "cluster";
import { STATUS_CODE, ERROR_MESSAGE } from "../types/types";

export function servePut(req: IncomingMessage,res: ServerResponse,userId: string | undefined,users: Record<string, any>){
     if(cluster.isWorker){
                

                    users = users.data
          }
          console.log(users)
    if(isValidUUID(userId)){
        let user = users.find((name:DatabaseUser) => name.userId === userId)
        let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end',() => {
        const userData = JSON.parse(body);
        if(user){
            try{
            res.statusCode = STATUS_CODE.OK;
            updateUser(user,userData)
            if(cluster.isWorker){
                
            process.send && process.send({ type: 'sharedMemoryUpdate', data: users })
          }
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ message: 'User updated successfully' }));
            }catch(err){
                console.log('error: ',err)
            }
            
        }else{
            res.statusCode = STATUS_CODE.NOT_FOUND;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: ERROR_MESSAGE.USER_NOT_FOUND }));
        }

    })
    }else{
         res.statusCode = STATUS_CODE.BAD_REQUEST;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: ERROR_MESSAGE.INVALID_UID }));
    }
}