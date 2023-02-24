export default [
  {
    label: "笔趣阁1",
    baseUrl: "https://www.wyill.com",
    searchBook: {
      searchUrl: "https://www.wyill.com/s?q=${name}", //搜索网页：${name}替换为资源
      itemElement: ".bookbox", //书本item
      nameElement: ".bookname", //书本名
      authorElement: ".author", //作者
      hrefElement: "a", //跳转元素
    },
    chaptersConfig: {
      listElement: ".listmain", //章节盒子
      itemElement: "dd", //章节item
      nameElement: "a", //章节名
      hrefElement: "a", //章节跳转
    },
    textConfig: {
      contentElemen: "#chaptercontent",
    },
  },
  {
    label: "笔趣阁2",
    baseUrl: "https://www.biquge7.top",
    searchBook: {
      searchUrl: "https://www.biquge7.top/search?keyword=${name}",
      itemElement: ".title", //
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
];
