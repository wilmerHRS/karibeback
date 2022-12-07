import { request, response } from "express";

const hello = (req = request, res = response) => {
  const name = req.query.name || "stranger";
  const message = `Hello, ${name}!`;
  res.json({
    message: message,
  });
};

export { hello };
