import { randomUUID } from "crypto";

export type DatabaseUser = {
  userId: string
  username: string
  age:number
  hobbies: string[]
}

export let users: DatabaseUser[] = [
  {
    userId: randomUUID(),
    username: "John",
    age: 22,
    hobbies: ["swimming", "playing football"],
    
  },
  {
    userId: randomUUID(),
    username: "Peter",
    age: 32,
    hobbies: ["Boxing", "Videogames"],
  },
];
