module.exports = {
  // base: "/blog/",
  title: "欧先森",
  description: "=====",
  themeConfig: {
    // sidebar: 'auto',//侧边栏
    nav: [
      { text: "主页", link: "/" },
      { text: "bug", link: "/bug/" },
      { text: "Phaser学习笔记", link: "/Phaser/" },
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
