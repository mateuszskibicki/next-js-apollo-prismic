const express = require("express");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();
const next = require("next");
const routesFrontEnd = require("./next-routes/next-router");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routesFrontEnd.getRequestHandler(app);

const serverExpress = () => {
  // Server express
  const server = express();
  server.use(compression());
  server.use(cors());

  // Next.js -> use routes
  return server.use(handle).listen(process.env.PORT || 3000);
};

// Next.js app if not test
process.env.NODE_ENV !== "test" &&
  app
    .prepare()
    .then(() => {
      serverExpress();
    })
    .catch(ex => {
      console.error(ex.stack);
      //process.exit(1)
    });

// Export express server if process.env.NODE_ENV === 'test' -> testing with jest and supertest
process.env.NODE_ENV === "test" && (module.exports = serverExpress);
