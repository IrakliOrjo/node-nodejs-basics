import { DatabaseUser } from "../data/users"

export function isCorrectUserBodyFormat(obj: DatabaseUser)  {
    if(typeof obj.username === 'string' && 
       typeof obj.age === 'string' && 
       Array.isArray(obj.hobbies) && Object.keys(obj).length === 3){
        return true
       }
}