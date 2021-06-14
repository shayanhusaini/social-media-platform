import { NextFunction, Request, Response } from "express";

const clients = [
  {
    username: "testClient",
    password: "testPassword",
    name: "Test Client",
  }
];

export async function clientAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (
    !req.header("Client-Auth") ||
    req.header("Client-Auth").indexOf("Basic ") === -1
  ) {
    return res.status(401).json({ message: "Missing Client-Auth Header" });
  }

  // verify auth credentials
  const base64Credentials = req.header("Client-Auth").split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  const user = authenticate({ username, password });
  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid Authentication Credentials" });
  }

  next();
}

function authenticate({ username, password }) {
    const user = clients.find(u => u.username === username && u.password === password);
    if (user) {
        delete user.password;
        return user;
    }
}
