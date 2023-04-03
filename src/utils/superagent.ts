const superagent = require("superagent");
require("superagent-charset")(superagent);
import axios from "axios";

export default (url: string, encodedType: any) => {
  return new Promise<string>(async (resolve, reject) => {
    if (encodedType === "gbk") {
      superagent
        .get(url)
        .buffer(true)
        .charset(encodedType)
        .end((err: any, html: any) => {
          return err ? reject(new Error(err)) : resolve(html.text);
        });
    } else {
      try {
        let { data } = await axios.get(url);
        resolve(data);
      } catch (err) {
        reject(new Error(err + ""));
      }
    }
  });
};
