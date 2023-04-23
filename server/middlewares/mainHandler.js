import { require } from '../../server/require.js';
const request = require("request");
import jsdom from 'jsdom'
import axios from "axios";
import { createElementFromHTML, getHtmlRes } from './html/getHtmlRes.js';
import { redisClient } from './../../server.js';

const { JSDOM } = jsdom;

const mainHandler = async (req, res) => {
  var fullUrl = process.env.FRONTEND_URL + req.originalUrl;
  if (req.get("Accept") && req.get("Accept").includes("text/html")) {
    console.log("req ===>", req.url);
    let htmlRes;
    try {
      const reqRes = await axios.get(fullUrl);
      htmlRes = reqRes.data;
    } catch (err) {
      console.log("err ===>", err);
      request(fullUrl).pipe(res);
      return;
    }
    const htmlWithData = getHtmlRes(htmlRes)
    const cacheRes = await redisClient.get(req.url+ "_" + process.env.FRONTEND_URL)
    if(cacheRes) {
        res.end(cacheRes)
        console.log("from cache")
        return
    } else {
        redisClient.set(req.url+ "_" + process.env.FRONTEND_URL, htmlWithData.toString())
    }
    res.end(htmlWithData);
  } else {
    request(fullUrl).pipe(res);
  }
};

export default mainHandler
