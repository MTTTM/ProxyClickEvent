# ProxyClickEvent

* 事件代理的情况下，支持阻止事件冒泡
* [demo](https://mtttm.github.io/ProxyClickEvent/)

## 协议
BSD 3-Clause License

## 安装
```javascript
 npm i proxyclickevent
```

## 使用方式

### script标签引入

``` html
  <div class="a" clickFn="fna">
        <div class="b" clickFn="fnb">
            <div class="e" clickFn="fne">点击<b>捣蛋鬼E</b>,会执行
                <B>e,b,a</B>函数
            </div>
            <div class="c" clickFn="fnc">点击<b>捣蛋鬼C,stop</b>,执行执行<b>c</b>函数</div>
            <div class="f" clickFn="fnf">点击<b>捣蛋鬼F</b>，会执行<b>f,b,a</b>函数</div>
        </div>
    </div>
<script src="yourPath/ProxyClickEvent.js"></script>
 
```

```javascript
  var funs = {
      fna: function() {
          console.log("点击a")
      },
      fnb: function() {
          console.log("点击b")
      },
      fnc: function(e) {
        //阻止事件冒泡
          e.__stop = true;
          console.log("点击c")
      },
      fnd: function() {
          console.log("点击d")
      },
      fne: function() {
          console.log("点击e")
      },
      fnf: function() {
          console.log("点击f")
      }
  }
let proxyEvent = new window.ProxyClickEvent();
//如果出现父子标签关系有变化时候，必须clear后重新扫描dom，重新add
 proxyEvent.clear();
let clickDoms = document.querySelectorAll("[clickFn]");
for (let i = 0; i < clickDoms.length; i++) {
    let dom = clickDoms[i];
    let fnStr = clickDoms[i].getAttribute("clickFn");
    proxyEvent.add(dom, funs[fnStr])
}

```
### es6的方式

``` javascript
import ProxyClickEvent from "proxyclickevent"
```

## 方法

| name      | desc |
| :-------------- | :-------------- |
| new ProxyClickEvent|接受一个代理点击的dom对象，如果不填写默认是document.body |
| add      |   接受2个参数，一个是dom，一个是对应的函数，目前不支持同一个dom被add多次，如果重复直接警告，拒绝本次add     |
| remove   |    接受2个参数，一个是dom，一个是对应的函数     |
| clear   |    清空内部数组  |
| destroy   | 销毁document的点击事件，已经数组和检测dom是否存在的定时器，组件销毁前一定要执行它|


## 提示
* 如果出现父子标签增减的时候，一定要先clear后，再遍历dom，将点击事件重新add到数组
* 否则无法保证“冒泡的顺序”

## 阻止冒泡
* 给回调函数的第一个参数添加属性`__stop`并赋值为true即可