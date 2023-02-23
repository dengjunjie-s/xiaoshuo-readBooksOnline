const https = require("https");

export let ttttttt = (url: string) => {
  https
    .get(url, (res: any) => {
      console.log(res);
      res.on("data", (chunk: any) => {
        console.log("data", chunk);
      });
      res.on("end", (chunk: any) => {
        console.log("end", chunk);
      });
    })
    .on("error", (err: any) => {
      console.log("Error: ", err.message);
    });
};
