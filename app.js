import { config } from "dotenv";

import { server } from "./config/server.js";

config();
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.info(`Listening on http://localhost:${port}/api-docs/`);
});
