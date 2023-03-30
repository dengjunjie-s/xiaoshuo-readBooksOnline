export default [
  {
    label: "预设: 起点",
    baseUrl: "https://www.qidian.com",
    searchBook: {
      searchUrl: "https://www.qidian.com/soushu/${name}.html", //搜索网页：${name}替换为资源
      isEncodeURI: true,
      itemElement: ".res-book-item", //书本item
      nameElement: ".book-info-title", //书本名
      authorElement: ".author", //作者
      hrefElement: "a", //跳转元素
    },
    chaptersConfig: {
      baseUrl: "https:",
      listElement: ".volume", //章节盒子
      itemElement: "li", //章节item
      nameElement: "a", //章节名
      hrefElement: "a", //章节跳转
      lastUrl: "#Catalog",
    },
    textConfig: {
      baseUrl: "https:",
      contentElemen: ".read-content",
    },
  },
  {
    label: "预设: 笔趣阁1",
    baseUrl: "https://www.biquge7.top",
    searchBook: {
      searchUrl: "https://www.biquge7.top/search?keyword=${name}",
      itemElement: ".title", //
      isEncodeURI: false,
      nameElement: "a", //
      authorElement: ".author", //
      hrefElement: "a", //
    },
    chaptersConfig: {
      listElement: ".list", //
      itemElement: "li", //
      nameElement: "a", //
      hrefElement: "a", //
    },
    textConfig: {
      contentElemen: ".text",
    },
  },
  {
    label: "预设: 笔趣阁1",
    baseUrl: "https://www.wyill.com",
    searchBook: {
      searchUrl: "https://www.wyill.com/s?q=${name}", //搜索网页：${name}替换为资源
      isEncodeURI: false,
      itemElement: ".bookbox", //书本item
      nameElement: ".bookname", //书本名
      authorElement: ".author", //作者
      hrefElement: "a", //跳转元素
    },
    chaptersConfig: {
      baseUrl: "",
      listElement: ".listmain", //章节盒子
      itemElement: "dd", //章节item
      nameElement: "a", //章节名
      hrefElement: "a", //章节跳转
    },
    textConfig: {
      contentElemen: "#chaptercontent",
    },
  },
];
