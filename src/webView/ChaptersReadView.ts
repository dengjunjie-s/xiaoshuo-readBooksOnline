import * as vscode from "vscode";
const axios = require("axios");
import * as cheerio from "cheerio";
import bookConfig from "../utils/bookConfig";
class ChaptersReadView {
  constructor() {}
  webView = null;
}
export default async (chaptersPath: string) => {
  let { contentElemen } = bookConfig.textConfig;
  const { data } = await axios.get(bookConfig.baseUrl + chaptersPath);
  const $ = cheerio.load(data);

  const panel = vscode.window.createWebviewPanel(
    "catCoding",
    "Cat Coding",
    vscode.ViewColumn.One,
    {},
  );

  panel.webview.html = $(contentElemen).html() + "";
};
