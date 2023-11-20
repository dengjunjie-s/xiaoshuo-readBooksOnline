export default [
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
  },
  {
    label: "晋江",
    baseUrl: "",
    webCode: "gbk", //网页编码: 支持 utf8(默认),gbk
    searchBook: {
      searchUrl: "https://www.jjwxc.net/search.php?kw=${name}&t=1", //搜索小说路径：${name}替换为小说名
      nameCode: "gbk", //小说名转换格式: 默认不转换，支持 gbk，encodeURI
      listElement: "#search_result", // 书本列表的标签元素
      itemElement: "h3", // 书本列表成员标签元素
      nameElement: "a", //书本名标签元素
      authorElement: "", //作者标签元素
      hrefElement: "a", //跳转标签元素
    },
    chaptersConfig: {
      baseUrl: "",
      listElement: ".cytable", //书本列表的标签元素
      itemElement: "tr", //章节列表成员标签元素
      nameElement: "a", //章节名标签元素
      hrefElement: "a", //跳转标签元素
    },
    textConfig: {
      baseUrl: "",
      contentElemen: ".novelbody", //小说文本标签元素
    },
  },
];
