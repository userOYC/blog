module.exports = {
  base: "/blog/",
  title: "博",
  description: "=====",
  themeConfig: {
    sidebar: 'auto',
    nav: [
      { text: "主页", link: "/" },
      { text: "bug", link: "/bug/" },
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
  // themeConfig:{
  //   sidebar: 'auto',
  //   // sidebarDepth: 1 
  // }
  
  // devServer: {
  //   open: true,
  //   port: 8812,
  // }
};
