import * as vscode from "vscode";
const axios = require("axios");
import * as cheerio from "cheerio";
import BookConfig from "../utils/bookConfig/index";
class ChaptersReadView {
  constructor() {}
  webView: vscode.WebviewPanel | undefined = undefined;
  async loadBookText(chaptersPath: string) {
    let { contentElemen } = BookConfig.config.textConfig;
    const { data } = await axios.get(BookConfig.config.baseUrl + chaptersPath);
    const $ = cheerio.load(data);
    if (!this.webView) {
      this.webView = vscode.window.createWebviewPanel(
        "xiaoshuo",
        "index.ts",
        vscode.ViewColumn.One,
        {},
      );
      this.webView.onDidDispose(() => {
        this.webView = undefined;
      });
    }
    this.webView.webview.html = ` 
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Cat Coding</title>
      </head>
      <body>
        ${$(contentElemen).html() + ""}
      </body>
      <style>
        body{
          margin: 0;
           padding: 10px;
           line-height: 28px;
          color: #8d8d8d;
          font-size: 16px;
       }
       </style>
      </html>
  `;
  }
}

export default new ChaptersReadView();
