# xiaoshuo-custom 

自定义小说源：

1，ctrl+, 

2，在 jiege:customSourcePath中设置配置文件路径

```json
// C:\Users\pig\Desktop\test.json
//数组可以配置源列表
[ 
  {
     //小说源名
    "label": "笔趣阁",
      //小说网站baseurl
    "baseUrl": "https://www.biquge7.top",
      //搜索书本配置
    "searchBook": {
        //搜索网站
      "searchUrl": "https://www.biquge7.top/search?keyword=${name}",
        //书的item元素
      "itemElement": ".title",
        //书名元素
      "nameElement": "a",
        //作者元素
      "authorElement": ".author",
        //书本详情跳转元素
      "hrefElement": "a"
    },
      //章节配置
    "chaptersConfig": {
        //章节列表元素
      "listElement": ".list",
        //章节item元素
      "itemElement": "li",
        //章节名称元素
      "nameElement": "a",
        //章节跳转元素
      "hrefElement": "a"
    },
      //小说配置
    "textConfig": {
        //小说内容元素
      "contentElemen": ".text"
    }
  }
]

```


