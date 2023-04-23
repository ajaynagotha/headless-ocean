import { require } from "./server/require.js";
require('module-alias/register')
import express, { Router } from "express";
import apiRoutes from "./server/routes/index.js";
import bodyParser from "body-parser";
import compression from 'compression';


require('dotenv').config()
import mainHandler from './server/middlewares/mainHandler.js';

const port = parseInt(process.env.PORT, 10) || 3000;

import { createClient } from 'redis';

export let redisClient=null;

(async () => {
  redisClient = createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();


// express setup
const router = Router();

  const server = express();
  server.use(compression())
  // support parsing of application/json type post data
  server.use(bodyParser.json());

  //support parsing of application/x-www-form-urlencoded post data
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(router);
  router.use("/api/v1", apiRoutes);

  server.get("/*", mainHandler)

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

