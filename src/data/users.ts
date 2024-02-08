import { randomUUID } from "node:crypto";
export let users = [
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
