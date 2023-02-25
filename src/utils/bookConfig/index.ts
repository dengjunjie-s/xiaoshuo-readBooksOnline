import baseConfig from "./baseConfig";
import * as vscode from "vscode";
class BookConfig {
  constructor() {}
  config = baseConfig[0];
  lastTimePick: any;
  choiceConfig() {
    return new Promise(async (resolve) => {
      const sourceList = [...baseConfig];
      const customPath =
        vscode.workspace.getConfiguration("jiege").get("customSourcePath") + "";
      //获取自定义源
      if (customPath) {
        try {
          const customSource = await import(customPath);
          customSource.forEach((element: any) => {
            sourceList.push(element);
          });
        } catch (err) {
          console.log(err);
        }
      }
      const pickItem = this.lastTimePick ? [this.lastTimePick] : [];
      sourceList.forEach(({ label }, index) => {
        pickItem.push({ label, index });
      });
      const quickPick = vscode.window.createQuickPick<{
        label: string;
        index: number;
      }>();
      quickPick.title = "选择小说源";
      quickPick.items = pickItem;
      quickPick.onDidChangeSelection((selection) => {
        let { label, index } = selection[0];
        this.config = sourceList[index];
        this.lastTimePick = {
          label: "上一次选择： " + label,
          index,
        };
        quickPick.dispose();
        resolve(true);
      });
      quickPick.onDidHide(() => {
        quickPick.dispose();
      });
      quickPick.show();
    });
  }
}
export default new BookConfig();
