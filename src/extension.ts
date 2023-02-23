// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as cheerio from "cheerio";
// import { testView } from "./TreeView/Testview";
import SearchBookView from "./TreeView/searchBookView";
export function activate(context: vscode.ExtensionContext) {
  //注册书treeView
  vscode.window.registerTreeDataProvider(
    "jiege-sidebar-bookTree",
    SearchBookView,
  );
  //搜索书本命令
  context.subscriptions.push(
    vscode.commands.registerCommand("xiaoshuo-custom.search", () => {
      SearchBookView.searchBook();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "xiaoshuo-custom.openTextInfo",
      (data: any) => {
        console.log("datya", data);
      },
    ),
  );
}
export function deactivate() {}
