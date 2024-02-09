import { IncomingMessage, ServerResponse } from "http";
import { users } from "../data/users";
import { isValidUUID } from "../utils/isValidUserId";
import { updateUser } from "../utils/updateUser";

export function servePut(req: IncomingMessage,res: ServerResponse,userId){

    if(isValidUUID(userId)){
        let user = users.find(name => name.userId === userId)
        let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end',() => {
        const userData = JSON.parse(body);
        if(user){
            try{
            res.statusCode = 200;
            updateUser(user,userData)
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ message: 'User updated successfully' }));
            }catch(err){
                console.log('error: ',err)
            }
            
        }else{
            res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'User Id record doesnt exist!' }));
        }

    })
    }else{
         res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'User Id is invalid!' }));
    }
}