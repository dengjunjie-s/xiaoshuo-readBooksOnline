import baseConfig from "./baseConfig";
import * as vscode from "vscode";
class BookConfig {
  constructor() {}
  config = baseConfig[0];
  choiceConfig() {
    return new Promise(async (resolve) => {
      const sourceList = [...baseConfig];
      //获取自定义源
      const pickItem: any[] = [
        {
          label: "自定义小说源",
        },
      ];
      sourceList.forEach(({ label }, index) => {
        pickItem.push({ label, index: index + 1 });
      });
      const quickPick = vscode.window.createQuickPick<{
        label: string;
        index: number;
      }>();
      quickPick.title = "选择小说源";
      quickPick.items = pickItem;
      quickPick.onDidChangeSelection(async (selection) => {
        let { label, index } = selection[0];
        if (!index) {
          quickPick.dispose();
          this.config = JSON.parse(
            (await vscode.window.showInputBox({
              placeHolder: "小说源: 输入小说配置json",
            })) + "",
          );
        } else {
          this.config = sourceList[index - 1];
          quickPick.dispose();
        }
        resolve(true);
      });
      quickPick.onDidHide(() => {
        quickPick.dispose();
      });
      quickPick.show();
    });
  }
  setConfig(data: any) {
    this.config = data;
  }
}
export default new BookConfig();
