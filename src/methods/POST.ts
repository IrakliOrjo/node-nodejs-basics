import { users } from "../data/users";
import { DatabaseUser } from "../data/users";
import { IncomingMessage, ServerResponse } from 'http'
import { isCorrectUserBodyFormat } from "../utils/isCorrectUserBodyFormat";
import { createNewUSer } from "../utils/createNewUser";



export function servePostRequest(req: IncomingMessage,res: ServerResponse) {
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
      console.log('Request body:', userData);
      if(isCorrectUserBodyFormat(userData)){
          let newUser = createNewUSer(newObj,userData)
          users.unshift(newUser);
          console.log(users);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ message: 'User added successfully' }));

      }else{
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Invalid JSON data' }));
          
        }
    } catch (error) {
        console.error('Error parsing request body:', error);

      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Error' }));
    }
    })
}