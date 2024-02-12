import { randomUUID } from "node:crypto";

export function createNewUSer(
  newObj: Record<string, any>,
  newUser: Record<string, any>
) {
  newObj.userId = randomUUID();
  newObj.username = newUser.username;
  newObj.age = parseInt(newUser.age);
  newObj.hobbies = newUser.hobbies;
  return newObj;
}
