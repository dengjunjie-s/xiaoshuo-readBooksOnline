import * as vscode from "vscode";

import superagent from "../utils/superagent";
import * as cheerio from "cheerio";
import BookConfig from "../utils/bookConfig/index";
class ChaptersReadView {
  constructor() {}
  webView: vscode.WebviewPanel | undefined = undefined;
  async loadBookText(chaptersPath: string) {
    let { contentElemen, baseUrl } = BookConfig.config.textConfig;

    let { webCode } = BookConfig.config;
    console.log((baseUrl || BookConfig.config.baseUrl) + chaptersPath);
    const data = await superagent(
      (baseUrl || BookConfig.config.baseUrl) + chaptersPath,
      webCode ? webCode : "utf-8",
    );
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
    const bookStyle =
      vscode.workspace.getConfiguration("jiege").get("bookStyle") + "";

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
          ${
            bookStyle
              ? bookStyle
              : `margin: 0;
          padding: 10px;
          line-height: 28px;
          color: #8d8d8d;
          font-size: 16px;`
          }
       }
       </style>
      </html>
  `;
  }
}

export default new ChaptersReadView();
