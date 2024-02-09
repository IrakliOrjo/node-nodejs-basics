import { isValidUUID } from "../utils/isValidUserId";

export function serveGetRequest(req, res, userId, users) {
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("HOME");
  } else if (req.url === "/api/users") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(users));
  } else if (req.url === `/api/users/${userId}`) {
    if (!isValidUUID(userId)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User is invalid UUId" }));
    }
    let user = users.find((user) => user.userId === userId);
    console.log(user, "user");
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User not found" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(user));
  } else {
    res.writeHead(404);
    return res.end("Page not found");
  }
}
