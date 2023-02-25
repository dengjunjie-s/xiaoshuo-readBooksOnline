# xiaoshuo-custom 

## 搜索小说

![](https://raw.githubusercontent.com/dengjunjie-s/drawing-bed/main/xiaoshuo-readBooksOnline/1.png)



## 自定义小说源：

1，按住ctrl + ，    打开vscode设置

2，搜索jiege 在 jiege:customSourcePath中设置配置文件路径

![](https://raw.githubusercontent.com/dengjunjie-s/drawing-bed/main/xiaoshuo-readBooksOnline/2.png)



3，配置文件说明

```
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

## 自定义样式

1， 打开vscode设置

2，搜索jiege 在jiege:bookstyle中设置style

