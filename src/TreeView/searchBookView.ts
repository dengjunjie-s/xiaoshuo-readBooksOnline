import * as vscode from "vscode";
const axios = require("axios");
import * as cheerio from "cheerio";
let bookConfig = {
  baseUrl: "https://www.wyill.com",
  searchBook: {
    searchUrl: "https://www.wyill.com/s?q=${name}",
    itemElement: ".bookbox",
    nameElement: ".bookname",
    authorElement: ".author",
    hrefElement: "a",
  },
  searchChapters: {
    listElement: ".listmain",
    itemElement: "dd",
    nameElement: "a",
    hrefElement: "a",
  },
};

export class SearchBookView implements vscode.TreeDataProvider<Dependency> {
  constructor() {}
  private _onDidChangeTreeData: vscode.EventEmitter<
    Dependency | undefined | null | void
  > = new vscode.EventEmitter<Dependency | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    Dependency | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
  getTreeItem(element: Dependency): vscode.TreeItem {
    return element;
  }

  searchStr = "三体";
  getChildren(element?: Dependency): Thenable<Dependency[]> {
    if (!element) {
      return getBookList(this.searchStr);
    }
    return getChaptersList(element.bookPath);
  }
  //搜索书本
  async searchBook() {
    this.searchStr =
      (await vscode.window.showInputBox({
        placeHolder: "请输入小说的名字",
      })) + "";
    this.refresh();
  }
}

export default new SearchBookView();
//获取书本列表
const getBookList = async (searchStr: string) => {
  if (!searchStr) {
    return Promise.resolve([]);
  }
  let { searchUrl, itemElement, nameElement, authorElement, hrefElement } =
    bookConfig.searchBook;
  const getCearchUrl = searchUrl.replace("${name}", searchStr);
  const { data } = await axios.get(getCearchUrl);
  const $ = cheerio.load(data);

  const bookList: Dependency[] = [];
  $(itemElement).each((index: number, element: any) => {
    let bookPathElement: any = $(element).find(hrefElement).first()[0];
    bookList.push(
      new Dependency(
        $(element).find(nameElement).first().text() +
          "-" +
          $(element).find(authorElement).first().text(),
        vscode.TreeItemCollapsibleState.Collapsed,
        bookPathElement.attribs.href,
      ),
    );
  });
  return Promise.resolve(bookList);
};
//获取章节列表
const getChaptersList = async (bookPath: string) => {
  let { listElement, itemElement, nameElement, hrefElement } =
    bookConfig.searchChapters;
  const { data } = await axios.get(bookConfig.baseUrl + bookPath);
  const $ = cheerio.load(data);
  let chaptersList: Dependency[] = [];
  $(listElement)
    .first()
    .find(itemElement)
    .each((index: number, element: any) => {
      let chaptersPathElement: any = $(element).find(hrefElement).first()[0];
      chaptersList.push(
        new Dependency(
          $(element).find(nameElement).first().text(),
          vscode.TreeItemCollapsibleState.None,
          chaptersPathElement.attribs.href,
          {
            title: "打开章节",
            command: "xiaoshuo-custom.openTextInfo",
            arguments: [chaptersPathElement.attribs.href],
          },
        ),
      );
    });
  return Promise.resolve(chaptersList);
};
class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly bookPath: string,
    public readonly command?: vscode.Command,
  ) {
    super(label, collapsibleState);
  }
}
