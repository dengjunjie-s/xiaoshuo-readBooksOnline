import * as vscode from "vscode";
const axios = require("axios");
import * as cheerio from "cheerio";

let bookConfig = {
  searchBook: {
    searchUrl: "https://www.wyill.com/s?q=${name}",
    itemElement: ".bookbox",
    nameElement: ".bookname",
    authorElement: ".author",
    chapterElement: "a",
  },
};

export class BookView implements vscode.TreeDataProvider<BookItem> {
  constructor(private workspaceRoot?: string) {}
  bookList = [{ name: "·12·1·12", bookPath: "" }];
  getTreeItem(element: BookItem): vscode.TreeItem {
    return element;
  }
  getChildren(element?: BookItem): Thenable<BookItem[]> {
    console.log(123123);
    if (!element) {
      return Promise.resolve(
        this.bookList.map((item) => {
          return new BookItem(
            item.name,
            vscode.TreeItemCollapsibleState.Collapsed,
            item.bookPath,
          );
        }),
      );
    }
    console.log(element);
    return Promise.resolve([]);
  }
  private _onDidChangeTreeData: vscode.EventEmitter<
    BookItem | undefined | null | void
  > = new vscode.EventEmitter<BookItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    BookItem | undefined | null | void
  > = this._onDidChangeTreeData.event;
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

//书本实例
class BookItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly bookPath: string,
  ) {
    super(label, collapsibleState);
  }
}

export default new BookView();
