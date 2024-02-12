import { IncomingMessage, ServerResponse } from "http";
import { isValidUUID } from "../utils/isValidUserId";
import { DatabaseUser } from "../data/usersStorageProccess";
import cluster from "cluster";
import { STATUS_CODE, ERROR_MESSAGE } from "../types/types";

export function serveDelete(
  req: IncomingMessage,
  res: ServerResponse,
  userId: string | undefined,
  users: Record<string, any>
) {
  if (cluster.isWorker) {
    users = users.data;
  }
  if (isValidUUID(userId)) {
    let user = users.find((name: DatabaseUser) => name.userId === userId);

    if (user) {
      try {
        let index = users.findIndex(
          (item: DatabaseUser) => item.userId === user.userId
        );

        users.splice(index, 1);
        if (cluster.isWorker) {
          process.send &&
            process.send({ type: "sharedMemoryUpdate", data: users });
        }
        res.statusCode = STATUS_CODE.NO_CONTENT;
        res.setHeader("Content-Type", "application/json");
        return res.end();
      } catch (err) {
        console.error(err);
      }
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND }));
    }
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ message: ERROR_MESSAGE.INVALID_UID }));
  }
}
