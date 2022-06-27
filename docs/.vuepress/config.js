module.exports = {
  base: "/blog/",
  title: "博",
  description: "记录点点滴滴",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      {
        text: "前端",
        items: [
          { text: "html", link: "/web/html/" },
          { text: "css", link: "/web/css/" },
        ],
      },
      { text: "面试问题", link: "/interview/" },
    ],
  },
  // devServer: {
  //   open: true,
  //   port: 8812,
  // }
};
