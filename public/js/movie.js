(function () {
  // // console.log("ajax");
  //-------------------------------------------
  // 请求电影数据
  var qs = `mid=${location.href.split("=")[1]}`;
  qs = qs == "mid=undefined" ? "mid=1" : qs;
  // console.log(qs);
  ajax({
      url: "https://triangle.applinzi.com/moviesItem",
      type: "get",
      dataType: "json",
      data: qs //参数
    })
    .then(result => {
      // console.log(result.data);
      var movie = result.data[0];
      var intr = document.getElementById("intr");
      var html = `<div>
        <img src="${movie.mimg_url}" alt="">
        </div>
        <div class="introduce_title"> 
          <h4>${movie.mtitle}</h4>
          <p>
            <span></span>
            <span>${movie.mrank.toFixed(1)}</span>
          </p>
          <p>${movie.msubtitle}</p>
          <p>${movie.mdirector}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${movie.mperformer}</p>
          <p>${movie.mmsg}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${movie.mdate}</p>
          <p class="p_mdetails">${movie.mdetails}<span></span></p>
          <p>
            <a href="javascript:;" id="like"><img src="Timg/details/like.png" style="width:15px;">想看</a>
          </p>
        </div>`;
      intr.innerHTML = html;
      //-----页面点击想看事件------------------------
      var t1 = setTimeout(function () {
        var like = document.getElementById("like");
        // console.log(like);
        // // console.log(like.textContent);
        // var likep=like.parentElement;
        like.onclick = function () {
          // console.log(like.textContent);
          if (like.textContent == "想看") {
            like.textContent = "已标记想看";
            // // console.log(666);
          } else {
            // like.textContent="想看";
            like.innerHTML = '<img src="Timg/details/like.png" style="width:15px;">想看';
          }
        }
        clearTimeout(t1);
      }, 100)
      // var more = document.getElementById("more");
      //---------------------------------------------

    });

  ajax({
      url: "https://triangle.applinzi.com/cinema",
      type: "get",
      dataType: "json"
    })
    .then(result => {
      // console.log(result);
      var res = result.data;
      var ul = document.querySelector(".cinema ul");
      for (var item of res) {
        //7.22
        ul.innerHTML += `
          <li>
            <div class="cinema_div">
              <span>${item.cname}</span><br>
              <span>${item.caddress}</span>
            </div>
            <p>￥${item.cprice}起</p>
            <a href="cinema.html?mid=${qs.split("=")[1]}&cid=${item.cid}">选座购票</a>
          </li>`
      }
    })
  //-------------------------------------------
  // 请求页右侧列表
  ajax({
      url: "https://triangle.applinzi.com/right.html",
      type: "get",
      dataType: "html"
    })
    .then(res => {
      // // console.log(res);
      // var right_list=document.getElementById("right_list");
      var right_list = document.querySelector("._body");
      right_list.innerHTML += '<div id="fon" style="display:none;"></div>' + res;
      /**************侧边栏鼠标移入事件******************/
      var sidebar = document.querySelectorAll(".index_left_ul>li");
      // // console.log(sidebar);
      for (var li of sidebar) {
        li.onmouseenter = function () {
          var divs = document.querySelectorAll(".index_left_ul>li>div");
          for (var n of divs) {
            n.style.height = "0";
          }
          var div = this.children[2];
          // // console.log(div);  
          div.style.height = "86px";
          // // console.log(123);
        }
      }
    })
  //---------------------------
  //请求页头
  ajax({
      url: "https://triangle.applinzi.com/header.html",
      type: "get",
      dataType: "html"
    })
    .then(res => {
      // // console.log(res);
      var header_html = document.getElementById("header_html");
      header_html.innerHTML = res;
      isLogin(); //调用验证登录
    });
  // 日期
  var date = document.getElementById("date");
  var mydate = new Date();
  var myw = mydate.getDay();
  var week = ["日", "一", "二", "三", "四", "五", "六"];
  var mym = mydate.getMonth() + 1;
  var myd = mydate.getDate();
  // // console.log(myw,mym,myd);
  var html = "";
  for (var i = 0; i < 3; i++) {
    html += `<li><span>${mym}月${myd+i}日 周${week[(myw+i)%7]}</span></li>`;
  }
  date.innerHTML = html;
})();