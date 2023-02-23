import * as vscode from "vscode";
import SearchBookTree from "./TreeView/searchBookTree";
import webView from "./webView/ChaptersReadView";
export function activate(context: vscode.ExtensionContext) {
  //注册书treeView
  vscode.window.registerTreeDataProvider(
    "jiege-sidebar-bookTree",
    SearchBookTree,
  );
  //搜索书本命令
  context.subscriptions.push(
    vscode.commands.registerCommand("xiaoshuo-custom.search", () => {
      SearchBookTree.searchBook();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "xiaoshuo-custom.openTextInfo",
      (chaptersPath: any) => {
        webView(chaptersPath);
      },
    ),
  );
}
export function deactivate() {}
