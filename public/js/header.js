function isLogin() {
  var Suid = sessionStorage.getItem("Suid");
  var Suname = sessionStorage.getItem("Suname");
  var log = document.getElementById("log");
  // console.log("我是头");
  if (Suid != null) {
    log.innerHTML = `<a href="javascript:;">hello, ${Suname}</a>`;
  } else {
    log.innerHTML = `<a href="login.html">登录</a>`;
  }
};