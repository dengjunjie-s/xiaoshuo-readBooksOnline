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
  type = "";
  bookSrc = "";
  getChildren(element?: Dependency): Thenable<Dependency[]> {
    if (this.type === "小说") {
      return getChaptersList(this.bookSrc, this.type);
    }
    if (!element) {
      return getBookList(this.searchStr);
    }
    return getChaptersList(element.bookPath, this.type);
  }
  //搜索书本
  async searchBook() {
    await BookConfig.choiceConfig();
    this.type = "小说源";
    this.searchStr =
      (await vscode.window.showInputBox({
        placeHolder: "请输入小说的名字",
      })) + "";
    this.refresh();
  }

  //加载书本
  async loadBook() {
    this.type = "小说";
    let bookConfig = JSON.parse(
      (await vscode.window.showInputBox({
        placeHolder: "加载小说: 输入小说配置json",
      })) + "",
    );
    this.bookSrc = bookConfig.chaptersConfig.baseUrl;
    BookConfig.setConfig(bookConfig);
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
    nameCode,
  } = BookConfig.config.searchBook;

  let { webCode } = BookConfig.config;

  const getCearchUrl =
    nameCode === "encodeUrl"
      ? encodeURI(searchUrl.replace("${name}", searchStr))
      : nameCode === "gbk"
      ? searchUrl.replace("${name}", gbk.encode(searchStr))
      : searchUrl.replace("${name}", searchStr);
  console.log(getCearchUrl);
  let data = await superagent(getCearchUrl, webCode ? webCode : "utf-8");
  console.log(data);
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
const getChaptersList = async (bookPath: string, type: string) => {
  const { listElement, itemElement, nameElement, hrefElement, baseUrl } =
    BookConfig.config.chaptersConfig;
  let { webCode } = BookConfig.config;
  const url =
    type === "小说源"
      ? (baseUrl ? baseUrl : BookConfig.config.baseUrl) + bookPath
      : bookPath;
  console.log(url);
  try {
    let data = await superagent(url, webCode ? webCode : "utf-8");
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
