import { DatabaseUser } from "../data/usersStorageProccess"

export function isCorrectUserBodyFormat(obj: DatabaseUser)  {
    if(typeof obj.username === 'string' && 
       typeof obj.age === 'string' && 
       Array.isArray(obj.hobbies) && Object.keys(obj).length === 3){
        return true
       }
}