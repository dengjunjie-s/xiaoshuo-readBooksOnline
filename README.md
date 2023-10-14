## 自定小说源配置：

需要转成json字符串传入

```json
{
    label: "起点",
    baseUrl: "https://www.qidian.com",
    webCode: "", //网页编码: 支持 utf8(默认),gbk
    searchBook: {
      searchUrl: "https://www.qidian.com/soushu/${name}.html", //搜索小说路径：${name}替换为小说名
      nameCode: "encodeURI", //小说名转换格式: 默认不转换，支持 gbk，encodeURI
      listElement: ".volume", // 书本列表的标签元素
      itemElement: ".res-book-item", // 书本列表成员标签元素
      nameElement: ".book-info-title", //书本名标签元素
      authorElement: ".author", //作者标签元素
      hrefElement: "a", //跳转标签元素
    },
    chaptersConfig: {
      baseUrl: "https:",
      listElement: ".catalog-all", //书本列表的标签元素
      itemElement: "li", //章节列表成员标签元素
      nameElement: "a", //章节名标签元素
      hrefElement: "a", //跳转标签元素
    },
    textConfig: {
      baseUrl: "https:",
      contentElemen: ".relative", //小说文本标签元素
    },
  }
```

## 载入小说配置

```json
{
      label: "长陵",
      webCode: "gbk", //网页编码: 支持 utf8(默认),gbk
      chaptersConfig: {
        baseUrl: "https://www.52bqg.org/book_109430/",
        listElement: "#list", //书本列表的标签元素
        itemElement: "dd", //章节列表成员标签元素
        nameElement: "a", //章节名标签元素
        hrefElement: "a", //跳转标签元素
      },
      textConfig: {
        baseUrl: "https://www.52bqg.org/book_109430/",
        contentElemen: "#content", //小说文本标签元素
      },
    }
```



## 自定义样式

1， 打开vscode设置

2，搜索jiege 在jiege:bookstyle中设置style

## 快捷转json字符串

https://www.runoob.com/try/try.php?filename=tryjson_stringify1

