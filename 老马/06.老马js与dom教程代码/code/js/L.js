(function(w){
  var L = w.L ? w.L : {}; // 定义L框架的根。
  // 我们占用了全局的L变量名。
  L.Dialog = function(selector) {

    // 先判断选择器对应之前已经创建过了吗？如果创建过了直接返回对象。
    if(L.Dialog.cache[selector]) {
      return L.Dialog.cache[selector];
    }
    // 接受用户传来的选择器
    // 1、要有一个 show方法， 弹出对话框。
    // 2、 关闭方法 close
    // 3、动态解析用户的输入信息。
    var dialogDiv = document.querySelector(selector);
    if(!dialogDiv) {
      return null;
    }
    // 拿到用户给的标题文本。
    var title = dialogDiv.getAttribute('title');

    // 初始化遮罩层。
    var dialogCover = document.createElement('div');
    dialogCover.className = "dialog-cover";
    dialogCover.style.display = "none";
    document.body.appendChild(dialogCover);
    var strHTML = "";
    strHTML += '<div class="dialog">';
    strHTML +='   <div class="dialog-h">';
    strHTML +='     <h3>' + title + '</h3>';
    strHTML +='     <i class="btn-close" id="">X</i>'
    strHTML +='   </div>'
    strHTML +='   <div class="dialog-b">'
    strHTML +=      dialogDiv.innerHTML;
    strHTML +='   </div>'
    strHTML +=' </div>'
    dialogDiv.innerHTML = strHTML;

    var dialog = {
      dialogDiv: dialogDiv, // 用户的dialog的div
      title: title,  // 用户的标题
      dialogCover: dialogCover,  // 遮罩层属性。
      show: function() {
        // 弹出层
        // 第一个显示 遮罩层， 第二个显示对话框  第三个，给关闭按钮绑定点击事件。
        this.dialogCover.style.display = "block";
        this.dialogDiv.style.display = "block";
        var self = this;
        var btnClose = dialogDiv.querySelector('.btn-close');
        btnClose.onclick = function() {
          self.close();
        }
      },
      close: function() {
        // 关闭层
        // 第一个不显示 遮罩层， 第二个不显示对话框  第三个，给关闭按钮去掉绑定点击事件。
        this.dialogCover.style.display = "none";
        this.dialogDiv.style.display = "none";
        var self = this;
        var btnClose = dialogDiv.querySelector('.btn-close');
        btnClose.onclick = null;
      }
    };

    L.Dialog.cache[selector] = dialog;
    return dialog;
  }

  // 在函数上创建一个缓存。 放 selector 对应的  dialog对象。
  L.Dialog.cache = {};
  w.L = L;
})(window || {});

/* 封装 动画的效果方法  */
(function(w){
  var L = w.L ? w.L : {}; // 定义L框架的根。
  // 我们占用了全局的L变量名。
  /**
   * @description 进行slideDown动画的方法
   * @param {HTMLElemnet} element 要进行动画的元素
   * @param {number} duration 持续的事件
   * @return {undefined}
   */
  L.slideDown = function(element, duration) {
    var start = Date.now(); // 开始动画的时间。
    element.style.display = "block";
    var originH = element.clientHeight;
    element.style.height = '0px';

    var timer = setInterval(function(){
      var now = Date.now();
      element.style.height = (now-start)/duration * originH + 'px';
      if(now-start >= duration) {
        element.style.height = originH + 'px';
        clearInterval(timer);
      }
    }, 1000/60);
  };
  w.L = L;
})(window || {});
