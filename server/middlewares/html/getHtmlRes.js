import { require } from "../../../server/require.js";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export function createElementFromHTML(htmlString) {
  const dom = new JSDOM("<html></html>", { includeNodeLocations: true });

  const document = dom.window.document;
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

export const getHtmlRes = function (html) {
  const dom = new JSDOM(html, { includeNodeLocations: true });

  const document = dom.window.document;
  const bodyEl = document.body; // implicitly created
  const headEl = document.getElementsByTagName("head")[0];
  const headString = "<title>Title from node</title>"
  headEl.appendChild(createElementFromHTML(headString))
  return document.documentElement.outerHTML
};
