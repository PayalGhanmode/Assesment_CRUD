require("@babel/register");
require("@babel/polyfill");
require("dotenv/config");
require("../config/db")();

const http = require("http");
const app = require("../app.js").default;
const config = require("../config/config.js");
const connfiguration = config.config[process.env.NODE_ENV];
const port = connfiguration.API_PORT;

const server = http.createServer(app);

server.listen(port);

server.on("listening", () => {
  console.log(`App is listening at http://localhost:${port}`);
});
