export default [
  {
    label: "预设: 起点",
    baseUrl: "https://www.qidian.com",
    decode: "", //网页格式默认是utf8,支持gbk
    searchBook: {
      searchUrl: "https://www.qidian.com/soushu/${name}.html", //搜索网页：${name}替换为资源
      nameEncodeType: "encodeURI", //name转换格式,空择不转换格式.目前支持 gbk，encodeURI
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
    label: "预设: 晋江",
    baseUrl: "",
    decode: "gbk", //网页格式默认是utf8,支持gbk
    searchBook: {
      searchUrl: "https://www.jjwxc.net/search.php?kw=${name}&t=1", //搜索网页：${name}替换为资源
      nameEncodeType: "gbk", //name转换格式,
      itemElement: "h3", //书本item
      nameElement: "a", //书本名
      authorElement: ".author", //作者
      hrefElement: "a", //跳转元素
    },
    chaptersConfig: {
      baseUrl: "",
      listElement: "#oneboolt tbody", //章节盒子
      itemElement: "tr ", //章节item
      nameElement: "a", //章节名
      hrefElement: "a", //章节跳转
      lastUrl: "#Catalog",
    },
    textConfig: {
      baseUrl: "",
      contentElemen: ".noveltext",
    },
  },
  {
    label: "预设: 笔趣阁1",
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
  {
    label: "预设: 笔趣阁2",
    baseUrl: "https://www.wyill.com",
    searchBook: {
      searchUrl: "https://www.wyill.com/s?q=${name}", //搜索网页：${name}替换为资源
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
