import "dotenv/config";
import { createServer } from "node:http";
import { serveGetRequest } from "./methods/GET";
import { servePostRequest } from "./methods/POST";
import { servePut } from "./methods/PUT";
import { serveDelete } from "./methods/DELETE";
import { availableParallelism } from "node:os";
import cluster, { Worker } from "node:cluster";
import { users } from "./data/usersStorageProccess";
import { HTTP_METHODS } from "./types/types";

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  const sharedMemory = { data: users };
  for (let i = 0; i < availableParallelism(); i++) {
    const worker = cluster.fork();
    worker.send({ type: "sharedMemoryUpdate", data: sharedMemory });
  }
  cluster.on("message", (worker, message) => {
    if (message.type === "sharedMemoryUpdate") {
      console.log("Received shared memory update from worker:", message.data);
      sharedMemory.data = message.data;
      for (const id in cluster.workers) {
        const worker = cluster.workers[id];

        worker &&
          worker.send({ type: "sharedMemoryUpdate", data: sharedMemory });
      }
    }
  });
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  let sharedMemory: Record<string, any>;

  process.on("message", (message: any) => {
    if (message.type === "sharedMemoryUpdate") {
      sharedMemory = message.data;
      console.log("Worker received shared memory:", sharedMemory);
    }
  });
  const port = parseInt(process.env.PORT!) + (cluster.worker as Worker).id - 1;

  const server = createServer((req, res) => {
    const urlParts = req?.url?.split("/");
    const userId = urlParts && urlParts[urlParts.length - 1];
    if (req.method === HTTP_METHODS.GET) {
      try {
        serveGetRequest(req, res, userId, sharedMemory);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Sorry for inconvenience, please try again" })
        );
      }
    } else if (req.method === HTTP_METHODS.POST && req.url === "/api/users") {
      try {
        servePostRequest(req, res, sharedMemory);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Sorry for inconvenience, please try again" })
        );
      }
    } else if (
      req.method === HTTP_METHODS.PUT &&
      req.url === `${`/api/users/${userId}`}`
    ) {
      try {
        servePut(req, res, userId, sharedMemory);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Sorry for inconvenience, please try again" })
        );
      }
    } else if (
      req.method === HTTP_METHODS.DELETE &&
      req.url === `/api/users/${userId}`
    ) {
      try {
        serveDelete(req, res, userId, sharedMemory);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            error: "Sorry for inconvenience, please try again!",
          })
        );
      }
    }
  });
  server.listen(port, () => console.log(`Worker server running on ${port}`));
}
