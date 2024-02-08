import { createServer } from "node:http";
import { users } from "./src/data/users";
import { serveRequest } from "./src/methods/GET";

const server = createServer((req, res) => {
  const urlParts = req?.url.split("/");
  const userId = urlParts[urlParts.length - 1];
  if (req.method === "GET") {
    serveRequest(req, res, userId, users);
  }
});

server.listen(3000, () => console.log("server running on 3000"));

console.log(`HEY ${process.env.HELLO}`);
