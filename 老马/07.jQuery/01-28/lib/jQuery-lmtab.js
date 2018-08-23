/**
 * 这是老马的插件：生成tab页签
 * 使用案例：第一：引入jQuery，和当前脚本
 * //第二步：按照以下标签书写
 * <div class="tab-wrap">
    <ul class="tab-hd">
      <li class="tab-hd-item">商品1</li>
      <li class="tab-hd-item">商品2</li>
      <li class="tab-hd-item">商品3</li>
    </ul>

    <ul class="tab-bd">
      <li class="tab-bd-item on">
        <img src="./img/1.png" alt="">
      </li>
      <li class="tab-bd-item">
        <img src="./img/2.png" alt="">
      </li>
      <li class="tab-bd-item">
        <img src="./img/3.png" width="600" height="300" alt="">
      </li>
    </ul>
  </div>

  * 第三步： $('.tab-wrap').lmTab();  
 */
(function ($) {
  $.fn.lmTab = function () {
    var $hdItems = $(this).find('.tab-hd-item'),
        $bdItems = $(this).find('.tab-bd-item');
    $hdItems.on('mouseenter', function (e) {
      // 拿到当前鼠标移入的hd部分li的索引。
      var index = $hdItems.index(this); // 获取元素的索引。
      var bdLiDom = $bdItems.get(index); // 可以获得第index个元素的dom对象。
      $(bdLiDom).addClass('on').siblings().removeClass('on');
    });
  };
})(jQuery);
