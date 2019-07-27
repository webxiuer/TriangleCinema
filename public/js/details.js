/***********轮播**************/
var ul_index = 0;
var ul_index2 = 0;
var ul = document.querySelector(".banner1 ul");
var ul2 = document.querySelector(".banner_2 ul");
var lis = document.querySelectorAll(".banner>.banner1 ul>li");
var li2s = document.querySelectorAll(".banner_2 ul>li");
var leng = "900";

function btnLeft() {
  if (ul_index < 0) {
    ul_index++;
    ul.style.marginLeft = ul_index * leng + "px";
  } else {
    /*背景高亮*/
    // document.querySelector("banner>.btn-left").setAttribute("url","../NMimg/details/left.png") 
    //   // console.log(this.ul)
  }
};

function btnRight() {
  //  // console.log(lis.length);
  if (ul_index > (1 - lis.length / 6)) {
    // // console.log("1111") 
    ul_index--;
    ul.style.marginLeft = ul_index * leng + "px";
    // // console.log(ul_index);
  };
  if (ul_index == (1 - lis.length / 6)) {
    return ul.style.transition = "all .3s linaer";
  }
};

function btn_left() {
  if (ul_index2 < 0) {
    ul_index2++;
    ul2.style.marginLeft = ul_index2 * leng + "px";
  }
}

function btn_right() {
  if (ul_index2 > (1 - li2s.length / 6)) {
    // // console.log("1122");
    ul_index2--;
    ul2.style.marginLeft = ul_index2 * leng + "px";
    if (ul_index2 == (1 - li2s.length / 6)) {
      //ul.style.marginLeft=0; 待定
    }
  }
}
//------------------------
// 请求网页头
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
    /********************citi-定位***********************/
    var divs = document.querySelector("#fon+div");
    //// console.log(divs)
    divs.onclick = function (e) {
      var divs = e.target;
      var b = document.querySelector(".loog_img>span>b");
      b.textContent = divs.textContent;
    }
  });
/*************/
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
    right_list.innerHTML = '<div id="fon" style="display:none;"></div>' + res;
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
//请求所有的电影数据
window.onload = function () {
  ajax({
      url: "https://triangle.applinzi.com/movies",
      type: "get",
      dataType: "json",
      // data:qs //
    })
    .then(result => {
      // console.log(result);
      //将结果放入页面的ul中
      var movies = result.data;
      var mlist1 = document.getElementById("mlist1");
      var mlist2 = document.getElementById("mlist2");
      var ml1 = "";
      var ml2 = "";
      for (movie of movies) {
        // // console.log(movie.mimg_url);
        //7.22
        ml1 += `
        <li>
          <img src="${movie.mimg_url}">
          <p>${movie.mtitle}</p>
          <a href="movie.html?mid=${movie.mid}">查看详情</a>
        </li>`;
      }
      mlist1.innerHTML = ml1;
      //---------
      var movies2 = movies.reverse();
      // console.log(movies2);
      for (movie of movies2) {
        // // console.log(movie.mimg_url);
        //7.22
        ml2 += `
        <li>
          <img src="${movie.mimg_url}">
          <p>${movie.mtitle}</p>          
          <a href="movie.html?mid=${movie.mid}">查看详情</a>
        </li>`;
      }
      mlist2.innerHTML = ml2;
      //动态创建javascript绑定相关事件
      var body = document.querySelector("body");
      // // console.log(body);
      var scr = document.createElement("script");
      scr.src = "../js/details.js";
      body.appendChild(scr);
    })
}