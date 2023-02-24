import baseConfig from "./baseConfig";
import * as vscode from "vscode";

class BookConfig {
  constructor() {}
  config: any;
  choiceConfig() {
    return new Promise((resolve, reject) => {
      const configList = baseConfig;
      const quickPick = vscode.window.createQuickPick<{
        label: string;
        index: number;
      }>();
      quickPick.items = configList.map(({ label }, index) => {
        return { label, index };
      });
      quickPick.onDidChangeSelection((selection) => {
        this.config = configList[selection[0].index];
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
