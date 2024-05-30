// .env file checking
import * as donenv from "dotenv";
donenv.config();

import config from "./config";
import app from "./server";

app.listen(config.port, () => {
  console.log(`server on http://localhost:${config.port}`);
});


// Using core functionality

// const http = require("http");

// const server = http.createServer(async (req, res) => {
//   if (req.method === "GET" && req.url === "/") {
//     res.statusCode = 200;
//     console.log("Hello from the server..");
//     res.end("This is Hareesh");
//   }
// });
