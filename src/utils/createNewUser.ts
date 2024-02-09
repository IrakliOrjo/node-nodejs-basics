import { randomUUID } from "node:crypto";

export function createNewUSer(newObj, newUser) {
    newObj.userId = randomUUID()
    newObj.username = newUser.username
    newObj.age = parseInt(newUser.age)
    newObj.hobbies = newUser.hobbies
    return newObj
} 