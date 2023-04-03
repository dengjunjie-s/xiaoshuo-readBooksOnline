import * as vscode from "vscode";
import * as cheerio from "cheerio";
import superagent from "../utils/superagent";
import gbk from "../utils/gbk";
import BookConfig from "../utils/bookConfig/index";
export class SearchBookTree implements vscode.TreeDataProvider<Dependency> {
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

  searchStr = "";
  getChildren(element?: Dependency): Thenable<Dependency[]> {
    if (!element) {
      return getBookList(this.searchStr);
    }
    return getChaptersList(element.bookPath);
  }
  //搜索书本
  async searchBook() {
    await BookConfig.choiceConfig();
    this.searchStr =
      (await vscode.window.showInputBox({
        placeHolder: "请输入小说的名字",
      })) + "";
    this.refresh();
  }
}

export default new SearchBookTree();
//获取书本列表
const getBookList = async (searchStr: string) => {
  if (!searchStr || !BookConfig.config) {
    return Promise.resolve([]);
  }
  let {
    searchUrl,
    itemElement,
    nameElement,
    authorElement,
    hrefElement,
    nameEncodeType,
  } = BookConfig.config.searchBook;

  let { decode } = BookConfig.config;

  const getCearchUrl =
    nameEncodeType === "encodeUrl"
      ? encodeURI(searchUrl.replace("${name}", searchStr))
      : nameEncodeType === "gbk"
      ? searchUrl.replace("${name}", gbk.encode(searchStr))
      : searchUrl.replace("${name}", searchStr);
  let data = await superagent(getCearchUrl, decode ? decode : "utf-8");
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
  const {
    listElement,
    itemElement,
    nameElement,
    hrefElement,
    baseUrl,
    lastUrl,
  } = BookConfig.config.chaptersConfig;
  let { decode } = BookConfig.config;

  const url =
    (baseUrl ? baseUrl : BookConfig.config.baseUrl) +
    bookPath +
    (lastUrl || "");
  try {
    let data = await superagent(url, decode ? decode : "utf-8");
    const $ = cheerio.load(data);
    let chaptersList: Dependency[] = [];
    $(listElement).each((index: number, boxElement: any) => {
      $(boxElement)
        .find(itemElement)
        .each((index: number, element: any) => {
          const chaptersPathElement: any = $(element)
            .find(hrefElement)
            .first()[0];
          chaptersList.push(
            new Dependency(
              $(element).find(nameElement).first().text(),
              vscode.TreeItemCollapsibleState.None,
              chaptersPathElement?.attribs.href,
              {
                title: "打开章节",
                command: "xiaoshuo-custom.openTextInfo",
                arguments: [chaptersPathElement?.attribs?.href],
              },
            ),
          );
        });
    });

    return Promise.resolve(chaptersList);
  } catch (err) {
    console.log(err);
  }
  return Promise.resolve([]);
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
