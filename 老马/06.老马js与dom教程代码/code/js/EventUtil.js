// 事件封装
(function(window){
  // 第一个：封装绑定事件的兼容处理
  var EventUtil = {
    // 1、给谁绑定  2、绑定什么事件  3、绑定事件的处理程序  4、捕获冒泡？
    addEvent: function(element, type, handler, isCapture) {
      if(element.addEventListener) { 
        // 标准浏览器的绑定事件
        // 处理第四个参数，保证isCapture一定是boolean类型的。
        isCapture = isCapture ? true : false;
        element.addEventListener(type, handler, isCapture);
      } else if(element.attachEvent) {
        // ie6-8的事件绑定方法
        element.attachEvent('on' + type, function(){
          // window.event;
          return handler.call(element, window.event); // 函数调用模式，this == window
          // 所有的事件处理中 this == event.target || event.srcElement
        });
      }
    },
    // 获取事件对象 兼容处理
    getEvent: function(e) {
      return e || window.event;
    }, 
    // 获取事件源对象
    getTarget: function(e) {
      return e.target || e.srcElement;
    },
    // 阻止事件冒泡
    stopPropagation: function(e) {
      if(e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancleBubble = true;
      }
    },
    // 阻止默认行为
    preventDefault: function(e) {
      if(e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
  };

  // 把我们上面定义的对象赋值给 window的属性。
  window.EventUtil = EventUtil;
})(window || {});

// 1、给谁绑定  2、绑定什么事件  3、绑定事件的处理程序  4、捕获冒泡？
// EventUtil.addEvent(element, 'clcik', function(e){}, false);
