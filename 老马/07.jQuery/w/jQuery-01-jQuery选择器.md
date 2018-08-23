# 前言
这套jQuery教程是老马专门为寒门子弟而录制，希望大家看到后能转发给更多的寒门子弟。视频都是免费，请参考课程地址：https://chuanke.baidu.com/s5508922.html

# 1.什么是jQuery？

## 1.1 jQuery介绍
jQuery是一个轻型、快速的、小巧的功能丰富的JavaScript类库。本质就是一堆js的函数的组合。对原生DOM操作做了一些非常有用的封装，可以让开发人员更简单、更方便、更统一的对DOM进行操作，比如：封装了事件相关统一操作api、DOM操作的API、Ajax、样式操作、动画的基础类库等。而且尽量屏蔽了浏览器的兼容性，而且提供了强大的可扩展性，成为了目前非常流行的前端开发框架之一。 

## 1.2 为什么要学习jQuery

虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？
+ 很多老的项目都是jQuery开发的，所以jQuery还会运行很长时间。
+ jQuery有助于刚入门的开发人员，更深入的理解原生DOM的开发方式
+ jQuery库封装的的确非常经典，做一下小项目和简单的项目足够支撑
+ 第三方类库太丰富！

**jQuery的理念：write less，do more**

## 1.3 jQuery相关资料

+ 参考书:《锋利的jQuery》 
+ jQuery官网: http://jquery.com 
+ jQuery 在线API: http://api.jquery.com
+ jQuery UI: http://jqueryui.com
+ jQuery的github地址： https://github.com/jquery/jquery

## 1.3 关于jQuery的版本说明

+ 1.x：兼容ie678,使用最为广泛的，官方只做BUG维护，功能不再新增。因此一般项目来说，使用1.x版本就可以了，最好版本在1.7.2 以上。
下载地址：http://code.jquery.com/jquery-1.11.3.min.js

+ 2.x：不兼容ie678，很少有人使用，官方只做BUG维护，功能不再新增。如果不考虑兼容低版本的浏览器可以使用2.x，一般不要用，直接要么用3.x版本，兼容低版本浏览器就用1.x就行了。
下载地址：http://code.jquery.com/jquery-2.1.4.min.js

+ 3.x：不兼容ie678，只支持最新的浏览器。除非特殊要求，一般不会使用3.x版本的，很多老的jQuery插件不支持这个版本。目前该版本是官方主要更新维护的版本。
下载地址：http://jquery.com/download/

+ 同一版本分类
  jQuery每一个版本又分为压缩版和未压缩版：
  - jquery.js：未压缩版本（开发版本），代码可读性高，推荐在开发和学习阶段使用，方便查看源代码。
  - jquery.min.js：压缩版本，去除了注释、换行、空格、并且将一些变量替换成了a,b,c之类的简单字符，基本没有可读性，推荐在项目生产环境使用，因为文件较小，减少网络压力。

+ jQuery3.0多出来一个精简版(Slim)
  精简版就是剔除了ajax模块和effects模块，精简版的文件比为未精简版要小很多，压缩和未压缩跟上面的区别一样。
  - jQuery.Slim.js：未压缩精简版
  - jQuery.Slim.min.js：压缩精简版
![image.png](http://upload-images.jianshu.io/upload_images/4393631-54de8f3269706f92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 1.4 jQuery的安装
+ 官网下载地址：[http://jquery.com/download/](http://jquery.com/download/)
+ npm方式安装
  ```shell
  npm install jquery
  ```
+ bower方式安装
   ```shell
   bower install jquery
   ````

# 2.入口函数介绍
## 2.1window.onload事件的问题
在之前[DOM课](https://chuanke.baidu.com/v5508922-239160-1771112.html) 中咱们已经说过用window的onload事件作为JS代码的入口，时机并不好。因为window.onload事件是在页面的图片、第三方脚本、样式等都下载和加载完成后才会触发。而我们希望是页面的HTML的文档树对象可进行交互就立即绑定DOM的事件和做一些初始化工作。所以之前的DOM时代的兼容代码
```js
/**
 * @description 当页面的文档树加载完成后，可以进行交互就立即触发回调函数执行
 * @param {function} callback -页面加载完成后调用的回调函数
 * @return {undefined} 返回undefined
 */
document.myReady = function(callback) {
  // jQuery实现文档加载完成后 事件的原理。
  // 封装标准浏览器和ie浏览器
  if(document.addEventListener) {
    document.addEventListener('DOMContentLoaded', callback, false);
  } else if(document.attachEvent) {
    // 兼容IE8及以下的浏览器。
    document.attachEvent('onreadystatechange', function(){
      // 当文档的状态变为：interactive表示，文档dom对象可以进行访问。
      if(document.readyState == "interactive") {
        callback(window.event);
      }
    });
  } else {  // 其他特殊情况
    window.onload = callback;
  }
};
```

## 2.2 jQuery类型引入HTML页面中
- 引入jQuery文件（注意路径）
```html
<script src="../code/lib/jquery.js"></script>
```
- 忘记引包或者引包在入口函数的后面
![](http://upload-images.jianshu.io/upload_images/4393631-7adcd4e2eddb9242.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 2.3  jQuery对于页面加载完成入口函数的封装
jQuery内部帮我们做好了页面加载完成的封装，而且时机正是页面的文档加载完成，而不是window.onload. 而且对于页面中的iframe等子页面也做了兼容处理。直接用如下的方法进行使用：
```js
// 第一种方式： 给document绑定ready事件。
$(document).ready(function(){
    //  ....此处是页面DOM加载完成的入口
});

// 第二种方式：直接给jQuery的全局函数传入一个回调函数
$(function(){
   //  ....此处是页面DOM加载完成的入口
});
```

# 3.jQuery的选择器

## 3.1 dom选择的痛点
+ ie8以下的浏览器不支持标准DOM的querySelector方法。强大的CSS选择器没有用武之地。
+ ie8以下的浏览器仅仅支持以下搜索的方法：   
   - `document.getElementById(id)`
   - `document.getElementsByTagName(tag)`
   - `document.getElementsByName(name)`
+ `chideNode、nextSibling等节点操作方法也很不灵活

**我们迫切希望，能用`querySelector()`或者`querySelectorAll()`这样的CSS选择器选择DOM元素节点的灵活方法。**

jQuery的1.x版本支持ie6~8浏览器，而且还支持丰富的CSS选择器选择元素。

## 3.2 id选择器
id选择器就是根据标签的id获取dom的包装对象。
```js
var $div = $('#id');  // $div 不是dom对象是jQuery的包装对象。
```

## 3.3 jQuery的包装对象和DOM对象

通过jQuery的选择器选择出来的对象都是jQuery的包装对象，里面封装了jQuery的很多API方法，后续我们会一一学习。

这里简单说一点：
  jQuery包装对象本身是一个伪数组，选择器返回的所有的DOM元素都会存在jQuery的包装对象中，并且还有很多其他的jQuery特有的api。

jQuery的包装对象和DOM对象的相互转换。

+ jQuery包装对象 →  DOM对象
```js
var $div = $('#id'); 
var domDiv = $div[0];
```
+ DOM对象→jQuery包装对象
```js
var domDiv = document.getElmentById('divId');
var $div = $(domDiv); 
// 等同如下代码：
var $div = $('#divid');
```

## 3.4 其他简单选择器

名称 |	用法 |	描述
---------------------|--------------------------|--------------
ID选择器          |	` $("#id");   `      |	获取指定ID的元素
全选选择器         | `$('*');`            | 匹配所有元素
类选择器          |	`$(".class");  `    |	获取同一类class的元素
标签选择器      |	`$("div");   `       |	获取同一类标签的所有元素
并集选择器      |	`$("div,p,li"); `    |	使用逗号分隔，只要符合条件之一就可。获取所有的div、p、li元素
交集选择器标签指定式选择器）|	`$("div.redClass");`	|注意选择器1和选择器2之间没有空格，class为redClass的div元素，注意区分后代选择器。

## 3.5 层级选择器

名称         |用法	                    |描述
---------------|---------------------------|----------
子代选择器|	`$("ul>li");`	    |使用>号，获取儿子层级的元素，注意，并不会获取孙子层级的元素
后代选择器|	`$("ul li");	`          |使用空格，代表后代选择器，获取ul下的所有li元素，包括孙子等

## 3.6 过滤选择器  

过滤选择器都带冒号         
    
语法 |用法	|   描述
-----|----------------|----------
`:first `|`$('li:first');`|获取第一个元素
`:last `|`$('li:last');`|获取最后个元素
`:contains(text) `|`$("div:contains('John')")`|匹配包含给定文本的元素
`:not(selector) `|`$("input:not(:checked)")`|去除所有与给定选择器匹配的元素
`:eq(index)` |	`$("li:eq(2)").css("color", "red");`	|获取到的li元素中，选择索引号为2的元素，索引号index从0开始。
`:odd`	| `$("li:odd").css("color", "red");`	|获取到的li元素中，选择索引号为奇数的元素
`:even`|	`$("li:even").css("color", "red");`	|获取到的li元素中，选择索引号为偶数的元素

+ 案例：隔行变色
```js
  $(function(){
      $("tr:odd").css('backgroundColor', '#eee')
      $("tr:even").css('backgroundColor', '#ddd')
    });
```

## 3.7 属性选择器
用法 | 说明
---|---
`$("p[attr]") ` | 选取所有该mix且具有attr属性的节点 
`$("p[attr=a_value]")`|选取所有该mix且具有attr属性并满足属性值为a_value的节点 
`$("p[attr^=a_value_head]")`|attr属性的属性值是以a_value_head开头的 
`$("p[attr$=a_value_end]")`|attr属性的属性值是以a_value_end结尾的 
`$("p[attr*=a_value")`|attr属性的属性值中包含a_value 

## 3.8 筛选方法

语法 | 用法	| 说明
---|----|----
`parent()`	|`$("#first").parent();	`|查找父亲
`children(selector)`	|`$("ul").children("li")`	 |相当于`$("ul>li")`，子类选择器
`find(selector)`|	`$("ul").find("li");`	|相当于$("ul li"),后代选择器
`siblings(selector)`	|`$("#first").siblings("li");	`|查找兄弟节点，不包括自己本身。
`nextAll([expr])`	|`$("div:first").nextAll()`|查找当前元素之后所有的同辈元素。
`prevtAll([expr])`	|`$("div:first").prevAll()`|查找当前元素之前所有的同辈元素
`hasClass(class)`	|`$('div').hasClass("protected")	`|检查当前的元素是否含有某个特定的类，如果有，则返回true。
`eq(index)`	|`$("li").eq(2);	`|相当于`$("li:eq(2)"),index`从0开始
`not(expr|ele|fn)`	|`$("p").not("#selected")	`|删除与指定表达式匹配的元素


# 4. 综合练习

有html代码如下：
```HTML
<table>
  <tr>
    <th><span class="pl20">编号</span></th>
    <th><span class="pl120">课程名称</span></th>
    <th><span>价格</span></th>
    <th><span>购买/试听</span></th>
    <th><span>发布时间</span></th>
    <th><span>状态</span></th>
    <th><span>操作</span></th>
  </tr>
</table>
 <div class="finance-pt">
    <table cellpadding="0" class="finance-form">
      <thead>
        <tr>
          <th colspan="2">必读数据</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a href="#">市场热点</a>
          </td>
          <td>
            <a href="#">微博舆情</a>
          </td>
        </tr>
        <tr class="la">
          <td>
            <a href="#">A股热图</a>
          </td>
          <td>
            <a href="#">美股热图</a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="#zz">环球股指</a>
          </td>
          <td>
            <a id="md" href="#dd">实时大单</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
```
+ 搜索样式类为：pl20的单元格。
```js
$('.pl20');
```
+ 搜索具有colspan属性的th标签
```js
$('th[colspan]');
```

+ 搜索id=md的标签
```js
$('#md');
```
+ 搜索.finance-form下面的所有的td标签
```js
$('.finance-form td');
```
+ 搜索tr.la的所有的兄弟标签
```js
$('tr.la').siblings();
```

***************
# 联系老马
对应视频地址：https://chuanke.baidu.com/s5508922.html
老马qq： 515154084
老马微信：请扫码
![扫码加老马微信](http://upload-images.jianshu.io/upload_images/4393631-5a7515d0e8d67565.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 前言
这套jQuery教程是老马专门为寒门子弟而录制，希望大家看到后能转发给更多的寒门子弟。视频都是免费，请参考课程地址：https://chuanke.baidu.com/s5508922.html

# 1.什么是jQuery？

## 1.1 jQuery介绍
jQuery是一个轻型、快速的、小巧的功能丰富的JavaScript类库。本质就是一堆js的函数的组合。对原生DOM操作做了一些非常有用的封装，可以让开发人员更简单、更方便、更统一的对DOM进行操作，比如：封装了事件相关统一操作api、DOM操作的API、Ajax、样式操作、动画的基础类库等。而且尽量屏蔽了浏览器的兼容性，而且提供了强大的可扩展性，成为了目前非常流行的前端开发框架之一。 

## 1.2 为什么要学习jQuery

虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？
+ 很多老的项目都是jQuery开发的，所以jQuery还会运行很长时间。
+ jQuery有助于刚入门的开发人员，更深入的理解原生DOM的开发方式
+ jQuery库封装的的确非常经典，做一下小项目和简单的项目足够支撑
+ 第三方类库太丰富！

**jQuery的理念：write less，do more**

## 1.3 jQuery相关资料

+ 参考书:《锋利的jQuery》 
+ jQuery官网: http://jquery.com 
+ jQuery 在线API: http://api.jquery.com
+ jQuery UI: http://jqueryui.com
+ jQuery的github地址： https://github.com/jquery/jquery

## 1.3 关于jQuery的版本说明

+ 1.x：兼容ie678,使用最为广泛的，官方只做BUG维护，功能不再新增。因此一般项目来说，使用1.x版本就可以了，最好版本在1.7.2 以上。
下载地址：http://code.jquery.com/jquery-1.11.3.min.js

+ 2.x：不兼容ie678，很少有人使用，官方只做BUG维护，功能不再新增。如果不考虑兼容低版本的浏览器可以使用2.x，一般不要用，直接要么用3.x版本，兼容低版本浏览器就用1.x就行了。
下载地址：http://code.jquery.com/jquery-2.1.4.min.js

+ 3.x：不兼容ie678，只支持最新的浏览器。除非特殊要求，一般不会使用3.x版本的，很多老的jQuery插件不支持这个版本。目前该版本是官方主要更新维护的版本。
下载地址：http://jquery.com/download/

+ 同一版本分类
  jQuery每一个版本又分为压缩版和未压缩版：
  - jquery.js：未压缩版本（开发版本），代码可读性高，推荐在开发和学习阶段使用，方便查看源代码。
  - jquery.min.js：压缩版本，去除了注释、换行、空格、并且将一些变量替换成了a,b,c之类的简单字符，基本没有可读性，推荐在项目生产环境使用，因为文件较小，减少网络压力。

+ jQuery3.0多出来一个精简版(Slim)
  精简版就是剔除了ajax模块和effects模块，精简版的文件比为未精简版要小很多，压缩和未压缩跟上面的区别一样。
  - jQuery.Slim.js：未压缩精简版
  - jQuery.Slim.min.js：压缩精简版
![image.png](http://upload-images.jianshu.io/upload_images/4393631-54de8f3269706f92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 1.4 jQuery的安装
+ 官网下载地址：[http://jquery.com/download/](http://jquery.com/download/)
+ npm方式安装
  ```shell
  npm install jquery
  ```
+ bower方式安装
   ```shell
   bower install jquery
   ````

# 2.入口函数介绍
## 2.1window.onload事件的问题
在之前[DOM课](https://chuanke.baidu.com/v5508922-239160-1771112.html) 中咱们已经说过用window的onload事件作为JS代码的入口，时机并不好。因为window.onload事件是在页面的图片、第三方脚本、样式等都下载和加载完成后才会触发。而我们希望是页面的HTML的文档树对象可进行交互就立即绑定DOM的事件和做一些初始化工作。所以之前的DOM时代的兼容代码
```js
/**
 * @description 当页面的文档树加载完成后，可以进行交互就立即触发回调函数执行
 * @param {function} callback -页面加载完成后调用的回调函数
 * @return {undefined} 返回undefined
 */
document.myReady = function(callback) {
  // jQuery实现文档加载完成后 事件的原理。
  // 封装标准浏览器和ie浏览器
  if(document.addEventListener) {
    document.addEventListener('DOMContentLoaded', callback, false);
  } else if(document.attachEvent) {
    // 兼容IE8及以下的浏览器。
    document.attachEvent('onreadystatechange', function(){
      // 当文档的状态变为：interactive表示，文档dom对象可以进行访问。
      if(document.readyState == "interactive") {
        callback(window.event);
      }
    });
  } else {  // 其他特殊情况
    window.onload = callback;
  }
};
```

## 2.2 jQuery类型引入HTML页面中
- 引入jQuery文件（注意路径）
```html
<script src="../code/lib/jquery.js"></script>
```
- 忘记引包或者引包在入口函数的后面
![](http://upload-images.jianshu.io/upload_images/4393631-7adcd4e2eddb9242.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 2.3  jQuery对于页面加载完成入口函数的封装
jQuery内部帮我们做好了页面加载完成的封装，而且时机正是页面的文档加载完成，而不是window.onload. 而且对于页面中的iframe等子页面也做了兼容处理。直接用如下的方法进行使用：
```js
// 第一种方式： 给document绑定ready事件。
$(document).ready(function(){
    //  ....此处是页面DOM加载完成的入口
});

// 第二种方式：直接给jQuery的全局函数传入一个回调函数
$(function(){
   //  ....此处是页面DOM加载完成的入口
});
```

# 3.jQuery的选择器

## 3.1 dom选择的痛点
+ ie8以下的浏览器不支持标准DOM的querySelector方法。强大的CSS选择器没有用武之地。
+ ie8以下的浏览器仅仅支持以下搜索的方法：   
   - `document.getElementById(id)`
   - `document.getElementsByTagName(tag)`
   - `document.getElementsByName(name)`
+ `chideNode、nextSibling等节点操作方法也很不灵活

**我们迫切希望，能用`querySelector()`或者`querySelectorAll()`这样的CSS选择器选择DOM元素节点的灵活方法。**

jQuery的1.x版本支持ie6~8浏览器，而且还支持丰富的CSS选择器选择元素。

## 3.2 id选择器
id选择器就是根据标签的id获取dom的包装对象。
```js
var $div = $('#id');  // $div 不是dom对象是jQuery的包装对象。
```

## 3.3 jQuery的包装对象和DOM对象

通过jQuery的选择器选择出来的对象都是jQuery的包装对象，里面封装了jQuery的很多API方法，后续我们会一一学习。

这里简单说一点：
  jQuery包装对象本身是一个伪数组，选择器返回的所有的DOM元素都会存在jQuery的包装对象中，并且还有很多其他的jQuery特有的api。

jQuery的包装对象和DOM对象的相互转换。

+ jQuery包装对象 →  DOM对象
```js
var $div = $('#id'); 
var domDiv = $div[0];
```
+ DOM对象→jQuery包装对象
```js
var domDiv = document.getElmentById('divId');
var $div = $(domDiv); 
// 等同如下代码：
var $div = $('#divid');
```

## 3.4 其他简单选择器

名称 |	用法 |	描述
---------------------|--------------------------|--------------
ID选择器          |	` $("#id");   `      |	获取指定ID的元素
全选选择器         | `$('*');`            | 匹配所有元素
类选择器          |	`$(".class");  `    |	获取同一类class的元素
标签选择器      |	`$("div");   `       |	获取同一类标签的所有元素
并集选择器      |	`$("div,p,li"); `    |	使用逗号分隔，只要符合条件之一就可。获取所有的div、p、li元素
交集选择器标签指定式选择器）|	`$("div.redClass");`	|注意选择器1和选择器2之间没有空格，class为redClass的div元素，注意区分后代选择器。

## 3.5 层级选择器

名称         |用法	                    |描述
---------------|---------------------------|----------
子代选择器|	`$("ul>li");`	    |使用>号，获取儿子层级的元素，注意，并不会获取孙子层级的元素
后代选择器|	`$("ul li");	`          |使用空格，代表后代选择器，获取ul下的所有li元素，包括孙子等

## 3.6 过滤选择器  

过滤选择器都带冒号         
    
语法 |用法	|   描述
-----|----------------|----------
`:first `|`$('li:first');`|获取第一个元素
`:last `|`$('li:last');`|获取最后个元素
`:contains(text) `|`$("div:contains('John')")`|匹配包含给定文本的元素
`:not(selector) `|`$("input:not(:checked)")`|去除所有与给定选择器匹配的元素
`:eq(index)` |	`$("li:eq(2)").css("color", "red");`	|获取到的li元素中，选择索引号为2的元素，索引号index从0开始。
`:odd`	| `$("li:odd").css("color", "red");`	|获取到的li元素中，选择索引号为奇数的元素
`:even`|	`$("li:even").css("color", "red");`	|获取到的li元素中，选择索引号为偶数的元素

+ 案例：隔行变色
```js
  $(function(){
      $("tr:odd").css('backgroundColor', '#eee')
      $("tr:even").css('backgroundColor', '#ddd')
    });
```

## 3.7 属性选择器
用法 | 说明
---|---
`$("p[attr]") ` | 选取所有该mix且具有attr属性的节点 
`$("p[attr=a_value]")`|选取所有该mix且具有attr属性并满足属性值为a_value的节点 
`$("p[attr^=a_value_head]")`|attr属性的属性值是以a_value_head开头的 
`$("p[attr$=a_value_end]")`|attr属性的属性值是以a_value_end结尾的 
`$("p[attr*=a_value")`|attr属性的属性值中包含a_value 

## 3.8 筛选方法

语法 | 用法	| 说明
---|----|----
`parent()`	|`$("#first").parent();	`|查找父亲
`children(selector)`	|`$("ul").children("li")`	 |相当于`$("ul>li")`，子类选择器
`find(selector)`|	`$("ul").find("li");`	|相当于$("ul li"),后代选择器
`siblings(selector)`	|`$("#first").siblings("li");	`|查找兄弟节点，不包括自己本身。
`nextAll([expr])`	|`$("div:first").nextAll()`|查找当前元素之后所有的同辈元素。
`prevtAll([expr])`	|`$("div:first").prevAll()`|查找当前元素之前所有的同辈元素
`hasClass(class)`	|`$('div').hasClass("protected")	`|检查当前的元素是否含有某个特定的类，如果有，则返回true。
`eq(index)`	|`$("li").eq(2);	`|相当于`$("li:eq(2)"),index`从0开始
`not(expr|ele|fn)`	|`$("p").not("#selected")	`|删除与指定表达式匹配的元素


# 4. 综合练习

有html代码如下：
```HTML
<table>
  <tr>
    <th><span class="pl20">编号</span></th>
    <th><span class="pl120">课程名称</span></th>
    <th><span>价格</span></th>
    <th><span>购买/试听</span></th>
    <th><span>发布时间</span></th>
    <th><span>状态</span></th>
    <th><span>操作</span></th>
  </tr>
</table>
 <div class="finance-pt">
    <table cellpadding="0" class="finance-form">
      <thead>
        <tr>
          <th colspan="2">必读数据</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a href="#">市场热点</a>
          </td>
          <td>
            <a href="#">微博舆情</a>
          </td>
        </tr>
        <tr class="la">
          <td>
            <a href="#">A股热图</a>
          </td>
          <td>
            <a href="#">美股热图</a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="#zz">环球股指</a>
          </td>
          <td>
            <a id="md" href="#dd">实时大单</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
```
+ 搜索样式类为：pl20的单元格。
```js
$('.pl20');
```
+ 搜索具有colspan属性的th标签
```js
$('th[colspan]');
```

+ 搜索id=md的标签
```js
$('#md');
```
+ 搜索.finance-form下面的所有的td标签
```js
$('.finance-form td');
```
+ 搜索tr.la的所有的兄弟标签
```js
$('tr.la').siblings();
```

***************
# 联系老马
对应视频地址：https://chuanke.baidu.com/s5508922.html
老马qq： 515154084
老马微信：请扫码
![扫码加老马微信](http://upload-images.jianshu.io/upload_images/4393631-5a7515d0e8d67565.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

