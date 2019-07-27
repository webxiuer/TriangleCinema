(function () {
  //--注册
  var uname = document.getElementById("uname");
  var unameIsOk = false; //用于判断用户名是否ok
  var upwd = document.getElementById("upwd");
  var upwdIsOk = false;
  var phone = document.getElementById("phone");
  var phoneIsOk = false; //用于判断手机号是否ok
  var check_code = document.getElementById("check_code"); //验证码
  var ccodeIsOk = false;
  var ischeck = document.getElementById("ischeck"); //协议复选框
  var btnreg = document.getElementById("btnreg"); //注册提交按钮
  var judge = document.getElementById("judge"); //提示span的父元素
  var spans = judge.children;
  var judge2 = document.getElementById("judge_tow"); //第二组提示的父元素
  var spans2 = judge2.children; //
  // var suc=document.getElementById("suc");
  var uname_suc = document.getElementById("uname_suc");
  var phone_suc = document.getElementById("phone_suc");
  var upwd_suc = document.getElementById("upwd_suc");
  var ccode_suc = document.getElementById("ccode_suc");
  var ischeck_suc = document.getElementById("ischeck_suc");
  //-----事件函数---------------------------------
  //--当用户名 手机号 密码 验证码input时
  //uname.onfocus=
  uname.oninput = phone.oninput = check_code.oninput = function () {
    // console.log(spans);
    for (var i = 0; i < spans.length; i++) {
      var idx = spans[i].getAttribute("data-for");
      // console.log(idx);
      var me = document.getElementById(idx);
      // console.log(me);
      if (me.value.trim() == "") {
        spans[i].style.opacity = 1;
        spans2[i].style.opacity = 0;
        // uname_suc.style.opacity=0; //√
        // phone_suc.style.opacity=0; //√
        // ccode_suc.style.opacity=0; //√
      } else {
        spans[i].style.opacity = 0;
        // spans2[i].style.opacity=1;
      }
      if (unameIsOk == true) {
        uname_suc.style.opacity = 1; //√
      } else {
        uname_suc.style.opacity = 0; //√
      }
      if (phoneIsOk == true) {
        phone_suc.style.opacity = 1; //√
      } else {
        phone_suc.style.opacity = 0; //√
      }
      if (ccodeIsOk == true) {
        ccode_suc.style.opacity = 1;
      } else {
        ccode_suc.style.opacity = 0;
      }
    }
    if (uname.value.length < 3) { //用户名双保险
      uname_suc.style.opacity = 0; //√
      spans[0].style.opacity = 1;
    }
  }
  //--页面加载完 触发一次uname的focus
  window.onload = function () {
    // uname.focus();
  }
  //--当用户名框失去焦点时, 发送请求验证用户名是否存在
  uname.onblur = function () {
    var reg = /\w{3,16}/i;
    if (!reg.test(this.value.trim())) {
      return; //
    }
    //
    var qs = "uname=" + uname.value;
    ajax({
        url: "https://triangle.applinzi.com/uname_check",
        type: "get",
        dataType: "json",
        data: qs //
      })
      .then(result => {
        // console.log(result);
        if (this.value.trim() == "") {
          spans[0].style.opacity = 1;
          uname_suc.style.opacity = 0; //
        } else {
          spans[0].style.opacity = 0;
        }
        // console.log(spans2);
        if (result.code < 0) {
          unameIsOk = true;
          spans2[0].style.opacity = 0;
          uname_suc.style.opacity = 1; //√
        } else {
          unameIsOk = false;
          uname_suc.style.opacity = 0; //√
          spans2[0].style.opacity = 1;
        }
      })
  }
  //--当手机号失去焦点时验证
  phone.onblur = function () {
    var reg = /^\d{11}$/;
    if (!reg.test(this.value.trim())) {
      return; //
    }
    var qs = "phone=" + phone.value;
    ajax({
        url: "https://triangle.applinzi.com/phone_check",
        type: "get",
        dataType: "json",
        data: qs //
      })
      .then(result => {
        // console.log(result);
        if (this.value.trim() == "") {
          spans[1].style.opacity = 1;
        } else {
          spans[1].style.opacity = 0;
        }
        if (result.code < 0) {
          phoneIsOk = true;
          spans2[1].style.opacity = 0;
          phone_suc.style.opacity = 1; //√
        } else {
          phoneIsOk = false;
          spans2[1].style.opacity = 1;
          phone_suc.style.opacity = 0; //√
        }
      })
  }
  //--当密码框输入时
  upwd.oninput = function () {
    var upwd_msg = document.getElementById("upwd_msg");
    if (this.value.trim() == "") {
      spans[2].style.opacity = 1;
      upwd_msg.style.opacity = 0;
    } else {
      spans[2].style.opacity = 0;
      upwd_msg.style.opacity = 1;
    }
    var reg = /\w{6,16}/i;
    if (!reg.test(this.value.trim())) {
      upwdIsOk = false;
      upwd_suc.style.opacity = 0; //√
    } else {
      upwdIsOk = true;
      upwd_suc.style.opacity = 1; //√
    }
  }
  upwd.onblur = function () {
    spans2[2].style.opacity = 0;
  }
  //--验证码格式
  check_code.onblur = function () {
    var ccode = check_code.value;
    var reg1 = /^\d{4}$/;
    var reg2 = /^\d{6}$/;
    // console.log(spans2[3]);
    if (reg1.test(ccode) || reg2.test(ccode)) {
      spans2[3].style.opacity = 0;
      ccodeIsOk = true;
      ccode_suc.style.opacity = 1; //√
    } else {
      spans2[3].style.opacity = 1;
      spans[3].style.opacity = 0;
      ccodeIsOk = false;
      ccode_suc.style.opacity = 0; //√
    }
  }
  //--协议勾选
  //--页面加载完 检测协议是否勾选并提示
  window.onload = ischeck.onchange = function () {
    if (ischeck.checked) {
      spans2[4].style.opacity = 0;
      btnreg.disabled = false;
      ischeck_suc.style.opacity = 1; //√
    } else {
      spans2[4].style.opacity = 1;
      btnreg.disabled = true;
      ischeck_suc.style.opacity = 0; //√
    }
  }
  //--------当几个条件都满足时
  //--点击注册
  btnreg.onclick = function () {
    var toast1 = document.getElementById("toast1");
    var toast2 = document.getElementById("toast2");
    // console.log(unameIsOk,upwdIsOk,phoneIsOk,ccodeIsOk);
    if (unameIsOk && phoneIsOk && upwdIsOk && ccodeIsOk) {
      var qs = `uname=${uname.value}&upwd=${upwd.value}&phone=${phone.value}`;
      ajax({
          url: "https://triangle.applinzi.com/reg",
          type: "post",
          dataType: "json",
          data: qs //
        })
        .then(result => {
          console.log(result);
          if (result.code > 0) { //跳转
            toast1.style.opacity = 0;
            toast2.style.opacity = 1;
            setTimeout(function () {
              location.href = "login.html";
            }, 1000);
            // location.reload();
          }
        })
    } else {
      // alert("请检查您的注册信息是否合规");
      toast2.style.opacity = 0;
      toast1.style.opacity = 1;
      setTimeout(function () {
        toast1.style.opacity = 0;
      }, 1200)
    }
  }
  //-----事件函数---------------------------------
})();