## 此页记录了开发过程中遇到的bug及部分需求的实现
### H5
1.使用`audio.js`创建音频对象在ios下的app端报错，无法正常播放音频

```javascript
    fatherSoundList = iaudio.on([{ src: "chat.mp3" }]);
```
在其他端运行正常 H5 小程序 浏览器，在ios系统下的app中会出现异常 异常如下:

![Alt](https://uat.beats-digital.com/oyc/images/blog/log1.png)

研究了一会没排除掉问题，无奈选用另一款插件 `howler.js`，问题解决，各端皆能正常运行

```javascript
    fatherSoundList = new Howl({src:['chat.mp3']})
```

####
2.在使用内联元素动态给元素设置选择角度和动画时间时 会出现一瞬间的高度塌陷然后复原，肉眼可见的效果为屏幕闪过一道黑影

![Alt](https://uat.beats-digital.com/oyc/images/blog/gif1.gif)

##### 上方gif看的不太仔细，我们通过工具一帧帧播放之后可以看到，在点击的时候 转盘区域 "消失了"，在下一帧复原

![Alt](https://uat.beats-digital.com/oyc/images/blog/img1.png)
#### 修改前代码
#### wxml
```html
    <!-- 抽奖大转盘的DOM结构 -->
    <view class="lotteryBox">
        <image class="loty_circle" src="../../images/lottery/circle.png" style="transition:{{animationTime}}ms ease;transform:rotate({{rotate}}deg)"></image> 
    </view>
```
#### js
```javascript
    // js 
    this.setData({ //点击之后触发  这一步是给元素添加旋转角度和动画持续时间
        rotate: rotate,
        animationTime: 5000,
    });
```
#### wxss
```css
    .lotteryBox{overflow: hidden;}
    .loty_circle{position: absolute;top: 0;left: 0; width: 695rpx;height: 695rpx;}
```
`整个盒子是被loty_circle元素撑开的，实际上并没有最外层盒子设置宽高，当点击的时候给loty_circle添加了动态的transition和transform会使最外层父级盒子的高度瞬间为0然后再度被子元素撑开`

#### 修改后代码
#### wxss
```css
    .lotteryBox{overflow: hidden;width: 695rpx;height: 695rpx;}
    .loty_circle{position: absolute;top: 0;left: 0; width: 695rpx;height: 695rpx;}
```
`只需要给最外层父级加上宽高问题就已解决，其中原理还待研究`

3.ios手机跳转外链在底部会出现bar状态栏

4.H5分享需要上传至FTP并且将网址生成二维码之后才能正常进行分享

### 小程序
1.需求需要动态生成一张海报并保存下来，后续需要触发下载，上一个页面生成并传到后台，在下一个页面请求该图片时异常缓慢有时还报错

2.IOS部分机型下出现scroll-view组件滑动时屏幕产生晃动

3.部分机型在用插件生成海报的时候出出现闪退

4.部分机型两个小程序之间来回跳转会出现闪退

5.PS中导出的按钮图片在IOS中会出现被截取一小段边框的现象

 `这是因为在ps中导出图片的边界和图层的边界相贴合的问题，其他类似的还有input边框 wechat聊天的边框 只要是图片的边界和图层的边界贴合就有可能出现这个问题`

 `解决办法：在ps中扩大该图片的背景，1-2px即可，或者 在css中将该图片的width值减少1-2个单位即可，但该方法可能导致原先被截取的图片正常显示，原先正常的图片反而被截取`
 推荐使用第一种办法

6.IOS中在input获取焦点之后点击picker组件会导致输入键盘和picker组件层叠

 `解决：在点击picker组件的时候 将其他所有的input框的焦点取消`

7.在app.js中使用getCurrentPages()想修改其他页面的值并同步需要使用setData赋值，直接修改不会同步

8.小程序本地图片不可加版本号，真机不会显示图片
