import { IncomingMessage, ServerResponse } from "http"
import { isValidUUID } from "../utils/isValidUserId";
import { users } from "../data/users";

export function serveDelete(req: IncomingMessage,res: ServerResponse,userId) {
    if(isValidUUID(userId)){
      
        let user = users.find(name => name.userId === userId)
         
        if(user){
            try{
                let index = users.findIndex(item => item.userId === user.userId)
                
                    users.splice(index,1)
                    res.statusCode = 204;
                    res.setHeader('Content-Type', 'application/json');
                     return res.end();
                
            }catch(err){
                console.error(err)
            }
        }else{
             res.statusCode = 404;
                     res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ message: 'Error: User Id doesn"t exist!' }));
        }
    }else{
        res.statusCode = 400;
                     res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ message: 'Error: not valid User ID!' }));
    }
}