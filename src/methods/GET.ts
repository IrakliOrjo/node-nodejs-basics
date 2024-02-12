import cluster from "cluster";
import { isValidUUID } from "../utils/isValidUserId";
import { IncomingMessage, ServerResponse } from "http";
import { DatabaseUser } from "../data/usersStorageProccess";
import { STATUS_CODE, ERROR_MESSAGE } from "../types/types";


export function serveGetRequest(req:IncomingMessage, res:ServerResponse,userId: string | undefined,users: Record<string, any>) {
   if(cluster.isWorker){
       users = users.data
          }
  if (req.url === "/") {
    res.writeHead(STATUS_CODE.OK, {
      "Content-Type": "text/plain",
    });
    res.end("HOME");
  } else if (req.url === "/api/users") {
    res.writeHead(STATUS_CODE.OK, {
      "Content-Type": "application/json",
    });
   
    res.end(JSON.stringify(users));
  } else if (req.url === `/api/users/${userId}`) {
    if (!isValidUUID(userId)) {
      res.writeHead(STATUS_CODE.BAD_REQUEST, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: ERROR_MESSAGE.INVALID_UID }));
    }
    let user = users.find((user:DatabaseUser) => user.userId === userId);
    console.log(user, "user");
    if (!user) {
      res.writeHead(STATUS_CODE.NOT_FOUND, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: ERROR_MESSAGE.USER_NOT_FOUND }));
    }
    res.writeHead(STATUS_CODE.OK, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(user));
  } else {
    res.writeHead(STATUS_CODE.NOT_FOUND);
    return res.end(ERROR_MESSAGE.PAGE_NOT_FOUND);
  }
}
