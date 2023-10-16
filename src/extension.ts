import * as vscode from "vscode";
import SearchBookTree from "./TreeView/searchBookTree";
import ChaptersReadView from "./webView/ChaptersReadView";
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

  //搜索书本命令
  context.subscriptions.push(
    vscode.commands.registerCommand("xiaoshuo-custom.loadBook", () => {
      SearchBookTree.loadBook();
    }),
  );

  //搜索书本命令
  context.subscriptions.push(
    vscode.commands.registerCommand("xiaoshuo-custom.loadHtml", async () => {
      let html = await vscode.window.showInputBox({
        placeHolder: "加载html: 加载html代码",
      });
      ChaptersReadView.loadHtml(html + "");
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "xiaoshuo-custom.openTextInfo",
      (chaptersPath: any) => {
        ChaptersReadView.loadBookText(chaptersPath);
      },
    ),
  );
}
export function deactivate() {}
