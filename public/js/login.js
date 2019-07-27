/*焦点点亮图标事件*/
(function () {
  var inp1 = document.getElementsByClassName("_body_login_input_1")[0];
  var inp2 = document.getElementsByClassName("_body_login_input_2")[0];
  var span1 = document.getElementsByClassName("_body_login_use")[0];
  var span2 = document.getElementsByClassName("_body_login_pwd")[0];
  inp2.onfocus = inp1.onfocus = function () {
    // // console.log(this.className);
    // // console.log(14);
    if (this.className == "_body_login_input_1") {
      span1.style.backgroundPosition = "25px -114px";
      inp1.style.border = "1px solid #FD528B"
      // // console.log(span1);
    } else {
      //  // console.log(span2);
      span2.style.backgroundPosition = "24px -156px";
      inp2.style.border = "1px solid #FD528B"
    }
  }
  inp2.onblur = inp1.onblur = function () {
    // // console.log(this.className);
    // // console.log(14);
    if (this.className == "_body_login_input_1") {
      span1.style.backgroundPosition = "24px -94px";
      inp1.style.border = "1px solid #F0F0F0"
      // // console.log(span1);
    } else {
      //  // console.log(span2);
      span2.style.backgroundPosition = "24px -134px";
      inp2.style.border = "1px solid #F0F0F0"
    }
  }
  //----请求和其他事件
  //--登录功能:
  //自动登录复选框
  var logcheck = document.getElementById("_body_login_checkbox");
  //遮罩层div
  var before_div = document.getElementById("before_div");
  //获取uname的input
  var input_uname = document.querySelector("[name='uname']");
  //获取upwd的input
  var input_upwd = document.querySelector("[name='upwd']");
  //获取msg
  var uname_msg = document.getElementById("uname_msg");
  var upwd_msg = document.getElementById("upwd_msg");
  //即时验证非空
  input_uname.oninput = noNull;
  input_upwd.oninput = noNull;
  //--页面加载完成自动判断并登录处理
  window.onload = logCheck; //
  logcheck.onclick = function () {
    // console.log("自动登录");
  }
  //-----函数-------------------------------------
  function logCheck() {
    if (logcheck.checked == false) {
      before_div.style.display = "none";
      //--1.手动点击登录
      var btnlog = document.getElementById("btnlog");
      btnlog.onclick = function () {
        //非空提醒函数+登录
        noNull().then(login);
      }
    } else {
      //--2.自动登录
      //显示半透明遮罩层+提示
      before_div.style.display = "block";
      //自动登录并跳转
      //
    }
  }

  function noNull() {
    return new Promise(function (open) {
      var umsg = [];
      umsg[0] = input_uname.value;
      umsg[1] = input_upwd.value;
      // // console.log(umsg);
      //判断
      var uname_ok = document.querySelector("#uname_msg>img:first-child");
      var uname_err = document.querySelector("#uname_msg>img:last-child");
      var upwd_ok = document.querySelector("#upwd_msg>img:first-child");
      var upwd_err = document.querySelector("#upwd_msg>img:last-child");
      if (umsg[0].trim() == "" || umsg[0].length < 3) {
        uname_ok.style.display = "none";
        uname_err.style.display = "block";
        uname_msg.style.opacity = 1;
      } else {
        uname_ok.style.display = "block";
        uname_err.style.display = "none";
        uname_msg.style.opacity = 1;
      }
      if (umsg[1].trim() == "" || umsg[1].length < 6) {
        // // console.log(umsg[1]);
        upwd_ok.style.display = "none";
        upwd_err.style.display = "block";
        upwd_msg.style.opacity = 1;
        return; //阻止继续
      } else {
        upwd_ok.style.display = "block";
        upwd_err.style.display = "none";
        upwd_msg.style.opacity = 1;
      }
      open(umsg); //发送登录请求
    })
  }

  function login(umsg) {
    // // console.log(umsg);
    return new Promise(function (open) {
      var qs = `uname=${umsg[0]}&upwd=${umsg[1]}`;
      ajax({
          url: "https://triangle.applinzi.com/login",
          type: "post",
          dataType: "json",
          data: qs //
        })
        .then(result => {
          if (result.code > 0) {
            // console.log(result,"登录成功");
            //将uid和uname存到sessionStorage
            sessionStorage.setItem("Suid", result.user[0].uid);
            sessionStorage.setItem("Suname", result.user[0].uname);
          } else {
            // console.log(result,"用户名或者密码错误");
            var toast2 = document.getElementById("toast2");
            toast2.style.opacity = 1;
            setTimeout(function () {
              toast2.style.opacity = 0;
            }, 1000)
            return; //
          }
          //成功后跳转
          // alert("跳转到主页...");
          var toast = document.getElementById("toast");
          toast.style.opacity = 1;
          setTimeout(function () {
            location.href = "index.html"; //
          }, 1000);
        })
    })
  }
})();