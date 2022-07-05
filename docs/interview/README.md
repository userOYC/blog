## Phaser文档属性与API整理

### 准备工作
中文文档：[https://www.phaser-china.com/doc.html](https://www.phaser-china.com/doc.html)<br>
操作案例：[http://labs.phaser.io/](http://labs.phaser.io/)<br>
入门案例：[http://club.phaser-china.com/topic/59899a81484a53dd723f422b](http://club.phaser-china.com/topic/59899a81484a53dd723f422b)<br>
官方论坛：[http://club.phaser-china.com/](http://club.phaser-china.com/)<br>

### 一：初始化游戏

1). 创建游戏需要准备一个核心配置项，并传入构造函数中，生成实例对象
```javascript
// 创建配置项
var config = {}

// 生成游戏实例
var game = new Phaser.Game(config)
```
在配置项中我们可以配置一些基本的参数，有如下选择：

![Alt](https://uat.beats-digital.com/oyc/images/blog/config.png)

一般游戏的基本配置如下
```html
    <div class="game" id="game"></div>
```
#
```css
    #game{width:100%;height:100%;background-size: cover;}
```
#
```javascript
var ww = window.innerWidth //浏览器的宽度
var hh = window.innerHidth //浏览器的高度
var gameWidht = 750 //游戏世界的宽度 => 设计稿宽度 一般为750
var gameHeight = 1398 //游戏世界的高度 => 设计稿高度 一般为1398

var config = {
    width:gameWidht,
    height:gameHeight,
    renderer: Phaser.CANVAS, //游戏渲染方式---手机游戏请务必指定Phaser.CANVAS
    parent: "game", //游戏容器
    transparent: true, //画布元素是否透明 默认为黑色
    state:{preload: preload,create: create,update: update}
}

var game = new Phaser.Game(config)

function preload(){}
function create(){}
function update(){}
```
 * preload 函数其中用来初始化加载游戏资源 比如 图片 雪碧图等..
 * create  函数其中主要用来创建游戏元素 比如游戏玩家 游戏中需要控制的一些元素都能在这创建
 * update  函数其中用来持续监听并更新游戏 比如我们可以监听一些元素的碰撞关系并实时渲染进游戏世界中

### 二：API

```javascript
    //游戏开启物理引擎 提供关于碰撞.重叠.移动等方法，游戏中需要检测元素碰撞等需要开启
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // 向游戏中加入一张静态的图片 key是preload函数中加载时定义的key值，游戏中的静态的背景图可以用该方法创建
    var itemObj = game.add.image(x,y,'key') 
    // 向游戏中添加可控制的精灵，游戏中需要控制的元素用该方法创建
    var player = game.add.sprite(x,y,'key')
    // 设置后才能使用类如 velocity/immovable等属性值 ，需传入精灵对象
    game.physics.arcade.enable(player);
    // 在游戏中创建一个祖集 可允许向该祖集中添加子集  => 需要生成多个元素共同控制
    var resultObj = game.add.group();
    //开启后 由该组创建或添加到该组的所有成员都将启用物理引擎
    resultObj.enableBody = true;
    //指定要启动的物理引擎
    resultObj.physicsBodyType = Phaser.Physics.ARCADE;
    //创建一个子集并添加到祖集中，受祖集影响 
    var childItem = resultObj.create(x,y,'key')
    // 重新设置精灵的大小(必填)并添加x，Y方向的偏移量 => 基于左上角(可选)  ，常用于修改精灵元素的碰撞体积 使其能正常的检测碰撞
    player.body.setSize(width, height, offsetX, offsetY);
    //对游戏世界添加点击事件
    game.input.onTap.add(onTap, this); 
```

### 三：一些静态属性
``` javascript
    //防止浏览器失去焦点时游戏暂停
    game.stage.disableVisibilityChange = true; 
     //强制游戏对象每帧计算其完整边界，超出调用onOutOfBounds,再次与世界边界相交，调用onEnterBounds
    key.checkWorldBounds = true;
    //重力设置为0 不会下坠
    player.body.allowGravity = 0 
    //固定元素 不会受其他元素所影响，需要在update函数中检测两者碰撞关系
    player.body.immovable = true;
    //设置不超出游戏边界 与游戏边界碰撞并反弹回世界
    player.body.collideWorldBounds = true;
    //设置元素的可见度
```