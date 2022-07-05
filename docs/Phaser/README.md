## Phaser实例编写

### 准备工作
中文文档：[https://www.phaser-china.com/doc.html](https://www.phaser-china.com/doc.html)<br>
操作案例：[http://labs.phaser.io/](http://labs.phaser.io/)<br>
入门案例：[http://club.phaser-china.com/topic/59899a81484a53dd723f422b](http://club.phaser-china.com/topic/59899a81484a53dd723f422b)<br>
官方论坛：[http://club.phaser-china.com/](http://club.phaser-china.com/)<br>


### 一：搭建初始结构
```html
<section class="game" id="game">
    <div class="start"></div>
</section>

<script src="js/phaser.min.js"></script>
```
```css
#game{width: 100%;height: 100%; background-image: url(../images/game/bg.png);background-size: cover;}
#game canvas{transform-origin: 0 0;position: absolute;}
#game .start{position: absolute;top: 11.4rem;left: 50%;transform: translateX(-50%); background-image: url(https://upload.cdn.be-xx.com/quik2020/23rd/images/home/start.png);width: 3rem;height: 0.85rem;z-index: 2;}

```
```js
evenInit()
function evenInit() { gameInit() }//初始化事件
function gameInit() {}  //初始化游戏
```

接下来我们初始化游戏实例
```js
function gameInit() {
    var config = {
      width: 750, //游戏宽度
      height: 1398, //游戏高度
      renderer: Phaser.CANVAS, //游戏渲染方式---手机游戏请务必指定Phaser.CANVAS
      parent: "game", //游戏容器
      transparent: true, //画布元素是否透明
      state: {preload: preload,create: create,update: update,},
    };
    game = new Phaser.Game(config); //game变量是全局的，游戏初始化
}
function preload(){}  //加载静态资源
function create(){} //创建游戏元素
function update(){} //实时监测游戏更新
```
此时我们的页面如下<br>

![Alt](https://uat.beats-digital.com/oyc/images/blog/game1.png)

生成了游戏实例之后我们给游戏加载一些静态资源并添加到游戏世界中
```js
function preload(){
    game.load.image('homebg', 'images/game/homebg.png'); //背景
    game.load.image('banzi', 'images/game/banzi.png');//板子
    game.load.image('q', 'images/game/q.png');//小Q
    game.load.image('bottom', 'images/game/bottom.png');//底座
    game.load.image('cake1', 'images/game/cake1.png');//蛋糕样式1
    game.load.image('cake2', 'images/game/cake2.png');
    game.load.image('cake3', 'images/game/cake3.png');
    game.load.image('cake4', 'images/game/cake4.png');
    game.load.image('cake5', 'images/game/cake5.png');
    game.load.image('cake6', 'images/game/cake6.png');//蛋糕样式6
}
function create(){
    homebg = game.add.image(0,75,'homebg') //背景图 75是因为图片高度和游戏高度差了75
    // 因为需要操控 我们用add.sprite来创建
    bottom = game.add.sprite(228, 807, 'bottom') //游戏底座
    player = game.add.sprite(312,500,'q') //操作的玩家
}
```
此时页面如下<br>

![Alt](https://uat.beats-digital.com/oyc/images/blog/game2.png)<br>

我们发现显示在我们视角中的视图是不对的<br>
这是因为绘制的canvas是一成不变的，我们需要让绘制的canvas在不同的机型上能缩放到正常比例<br>
我们添加一行适配代码再来看看

```js
function create(){
    var ww = window.innerWidth;
    var hh = window.innerHeight;
    var p = ww / 750; //缩放比
    $('#game canvas').css({"scale": p,"top":((hh - 1398 * p) > 0 ? (hh - 1398 * p) : 0 ) + 'px'})//适配
    game.stage.disableVisibilityChange = true; //防止浏览器失去焦点时游戏暂停
    homebg = game.add.image(0,75,'homebg') //添加背景
    bottom = game.add.sprite(228, 807, 'bottom') 
    player = game.add.sprite(312,615,'q')
}
```
已经可以正常显示了<br>

![Alt](https://uat.beats-digital.com/oyc/images/blog/game3.png)<br>
这时候我们需要让小Q可以动起来，即点击屏幕可以让小Q '跳跃'
```js
function create(){
    var ww = window.innerWidth;
    var hh = window.innerHeight;
    var p = ww / 750; //缩放比
    $('#game canvas').css({"scale": p,"top":((hh - 1398 * p) > 0 ? (hh - 1398 * p) : 0 ) + 'px'})//适配
    homebg = game.add.image(0,75,'homebg') //添加背景
    bottom = game.add.sprite(228, 807, 'bottom') 
    player = game.add.sprite(312,615,'q')
    game.input.onTap.add(onTap, this); //对游戏世界添加点击事件
}

var onTap = function onTap(){
    // game.add.tween(player).to (执行动画的元素对象, 持续时间 , 运动曲线 , 自动开始 , 延迟时间 , 是否重复 , 是否自动倒转并执行 ) → { Phaser.Tween }
    // addOnce(函数, 上下文对象, 执行优先级, 传递的参数) 一次性侦听器 结束之后立即销毁
    game.add.tween(player).to( { y: player.y - 250 }, 400, Phaser.Easing.Quadratic.Out, true,0,0,false).onComplete.addOnce(function(){});
}
```
我们发现小Q的跳跃和我们的预期有所差别，我们希望小Q跳跃之后能自由落下并且完全落地之后才能再次点击<br>
![Alt](https://uat.beats-digital.com/oyc/images/blog/gif2.gif)<br>
我们改变一下代码 加入重力影响和点击状态判断
```js
function create(){
    var ww = window.innerWidth;
    var hh = window.innerHeight;
    var p = ww / 750; //缩放比
    $('#game canvas').css({"scale": p,"top":((hh - 1398 * p) > 0 ? (hh - 1398 * p) : 0 ) + 'px'})//适配
    homebg = game.add.image(0,75,'homebg') //添加背景
    bottom = game.add.sprite(228, 807, 'bottom') 
    player = game.add.sprite(312,615,'q')
    game.input.onTap.add(onTap, this); //对游戏世界添加点击事件
    game.physics.arcade.enable(player);// 创建一个受影响的物理体 开启后才能使用如下的静态属性
    game.physics.arcade.gravity.y = 800; //设置重力速度
}
var onTap = function onTap(){
    if(isClick) {
        isClick = false //全局的isClick 默认为true
        // game.add.tween(player).to (执行动画的元素对象, 持续时间 , 运动曲线 , 自动开始 , 延迟时间 , 是否重复 , 是否自动倒转并执行 ) → { Phaser.Tween }
        // addOnce(函数, 上下文对象, 执行优先级, 传递的参数) 一次性侦听器 结束之后立即销毁
        game.add.tween(player).to( { y: player.y - 250 }, 400, Phaser.Easing.Quadratic.Out, true,0,0,false).onComplete.addOnce(function(){
            let setOut1 = setTimeout(()=>{
                clearTimeout(setOut1)
                isClick = true 
            },500) //动画结束之后再等100毫秒 避免出现某些过快点击的bug
        });
    }
}
```
效果如下<br>

![Alt](https://uat.beats-digital.com/oyc/images/blog/gif3.gif)<br>

已经可以受到重力影响，但却会直接掉落到游戏边界，我们给小Q和底座加上碰撞监听<br>

```js
game.physics.arcade.enable(bottom);
bottom.body.immovable = true;//底部盘子固定，不会受到撞击影响
bottom.body.allowGravity = 0;  //重力为0

function update(){
    //game.physics.arcade.collide(监测对象一, 监测对象二, 回调函数, 额外的回调 , 上下文对象 会作为碰撞对象传递给回调函数)//角色与蛋糕碰撞
    game.physics.arcade.collide(player, bottom);//小Q和底座
}
```
看起来已经实现了最基本的需求 实现了小Q的跳跃和物体碰撞监测，对过快的点击也做了处理<br> 
![Alt](https://uat.beats-digital.com/oyc/images/blog/gif4.gif)<br>

接下来我们需要生成侧面过来的蛋糕，并且能监测到碰撞<br>
如果和小Q发生了侧面的碰撞，视为游戏结束<br>
如果和小Q发生了底部的碰撞，视为游戏得分<br>

```js
function create(){
    cakesGroup = game.add.group(); //创建蛋糕组
    cakesGroup.enableBody = true;//开启后 由该组创建或添加到该组的所有成员都将启用物理引擎
    cakesGroup.physicsBodyType = Phaser.Physics.ARCADE;//指定要启动的物理引擎
}
function createCake(){
    curCakeNum++ //全局蛋糕精灵唯一标识
    moveSpeed = 3.5 //蛋糕移入的速度 
    maxSpeed = 20; //蛋糕移入的最大速度
    // 每生成蛋糕移入速度增加 当移入速度达到设定的最大值时，取最大值
    if(curCakeNum) moveSpeed >= maxSpeed ? (moveSpeed = maxSpeed) : (moveSpeed += 0.5)
    let CAKE = {
        left:-300, //出来的蛋糕X位置
        top:680 - ((curCakeNum - 1) * 110),//680是第一个蛋糕位置 120是蛋糕的高度为了不漏出缝隙每次累加110
        height:cakesGroup.y
    } 
    let sprite,banzi
    sprite = cakesGroup.create(CAKE.left,CAKE.top,'cake1') //group.create 创建的是精灵
    banzi = sprite.addChild(game.add.image(-300,sprite.body.height,'banzi')); //设置为子精灵相对父精灵定位
    banzi.scale.setTo(1.5,1) //放大板子的宽度
    sprite.body.allowGravity = false;//没有重力
    sprite.body.immovable = true; //开启固定，不会受碰撞等影响
    //loop(多少毫秒执行一次, 回调, 上下文对象) → {Phaser.TimerEvent}
    var moveInter = game.time.events.loop(Phaser.Timer.SECOND/100, function(){ //循环动画
      sprite.x = sprite.x + moveSpeed //累加X值
    }, this);
}
```
上面代码已经生成了蛋糕并且能够保持移动，现在我们需要监测碰撞，并且重复生成移动蛋糕<br>
![Alt](https://uat.beats-digital.com/oyc/images/blog/gif5.gif)<br>
我们稍微修改代码<br>
```js
function createCake(){
    var moveInter = game.time.events.loop(Phaser.Timer.SECOND/100, function(){ //循环动画
      sprite.x = sprite.x + moveSpeed //累加X值
        //当移动到一定距离后触发回收事件 移除板子 (因为小q跳起来的跨度是无法完全越过蛋糕的，所以不会出现蛋糕未碰到小Q的情况，两者必然会发生碰撞)
      if(sprite.x >= 260){cakeMoveEnd(moveInter,curCakeNum,banzi)}
    }, this);
}
  function cakeMoveEnd(timer,Num,bz){
    game.time.events.remove(timer); //移除定时器
        game.add.tween(bz).to( { x: -800 }, 400, Phaser.Easing.Quadratic.InOut, true).onComplete.addOnce(function(){
            bz.destroy() //完成之后销毁对象
        })
    if(!isGameOver) createCake() //生成新的板子
  }
```
运行如下<br>
![Alt](https://uat.beats-digital.com/oyc/images/blog/gif6.gif)<br>

已经可以连续生成移动的蛋糕，我们给小Q和蛋糕加上碰撞监测以及游戏结束事件，以及让游戏视角一直处于中心位置<br>
```js
function update(){
    game.physics.arcade.collide(player, cakesGroup, collisionHandler, null , this)//小Q与蛋糕碰撞
}
function collisionHandler(){
    // 这里用Y值来判断小Q和蛋糕发生的是侧面的碰撞还是底部的碰撞
    // Y值可以理解为页面左上角坐标(0,0)开始到元素左上角(0,0)的位置
    if(!isGameOver) {
        let Qbot = parseInt(player.y + player.body.height) //小Q底部
        let cakeY =  parseInt(cake.y + cakesGroup.y) //蛋糕顶部  
        //collisionHandler方法只要碰撞到就会执行，所以我们需要稍加控制，isBottom字段让整个方法只执行一次
        if(!cake.isBottom){
            if(Qbot > cakeY) { //侧面的碰撞
                game.add.tween(player).to( {x:540}, 500, Phaser.Easing.Quadratic.Out, true)
                gameOver() //游戏结束
            } else if(Qbot == cakeY) { //底部的碰撞
                playerDownCake()
                cake.isBottom = true
            }
        }
    }
}
function playerDownCake(){
    // sprite.body.allowGravity = true;//到蛋糕上面使它有重力
    if(curCakeNum > 1){
        game.add.tween(player).to( { y: player.y + 110 }, timerSpeed, Phaser.Easing.Quadratic.Out, true)
        game.add.tween(homebg).to( { y: homebg.y + 110 },timerSpeed, Phaser.Easing.Quadratic.Out, true)
        game.add.tween(bottom).to( { y: bottom.y + 110 }, timerSpeed, Phaser.Easing.Quadratic.Out, true)
        game.add.tween(cakesGroup).to( { y: cakesGroup.y + 110 }, timerSpeed, Phaser.Easing.Quadratic.Out, true)

    }
}
function gameOver(){
    isGameOver = true //全局游戏状态
    icom.alert('游戏结束',()=>{againGame()})
}
```
我们看下效果<br>

![Alt](https://uat.beats-digital.com/oyc/images/blog/gif8.gif)<br>

游戏感觉大体已经完成，我们再完善一下，加上再来一次的逻辑处理

```js
function againGame(){
    game.destroy()//销毁整个游戏
    $('#game canvas').remove()
    gameInit()//游戏重新初始化 需要重置掉定义的全局状态
}

// 这是我们前面定义好的初始化函数
function gameInit() {
    var config = {
      width: 750, //游戏宽度
      height: 1398, //游戏高度
      renderer: Phaser.CANVAS, //游戏渲染方式---手机游戏请务必指定Phaser.CANVAS
      parent: "game", //游戏容器
      transparent: true, //画布元素是否透明
      state: {preload: preload,create: create,update: update,},
    };
    game = new Phaser.Game(config); //game变量是全局的，游戏初始化
}
```
我们来看看这样做的效果<br>

![Alt](https://uat.beats-digital.com/oyc/images/blog/gif9.gif)<br>

游戏确实被重置了，但一些全局状态还没有重置，我们需要再次进行处理
```js
function gameInit() {
    var config = {
      width: 750, //游戏宽度
      height: 1398, //游戏高度
      renderer: Phaser.CANVAS, //游戏渲染方式---手机游戏请务必指定Phaser.CANVAS
      parent: "game", //游戏容器
      transparent: true, //画布元素是否透明
      state: {preload: preload,create: create,update: update,},
    };
    game = new Phaser.Game(config); //game变量是全局的，游戏初始化
    initGameParameter()
}
function initGameParameter(){ //初始化全局动态参数
    curCakeNum = 0
    moveSpeed = 3.5 //蛋糕移入的速度 
    grade = 0
    isGameOver = false
    isClick = true
    $('.grade').html('得分：' + grade)
}
```
我们再看看效果<br>

![Alt](https://uat.beats-digital.com/oyc/images/blog/gif10.gif)<br>

已经没问题了，完全重置掉了游戏


