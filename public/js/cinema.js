  /***********轮播li**************/
  var ul_index = 0;
  var ul_index2 = 0;
  var ul = document.querySelector(".banner1 ul");
  var ul2 = document.querySelector(".banner_2 ul");
  var lis = [];
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
  //=========
  // 根据传送id获取场次
  var movie1;
  var moive = document.querySelector(".banner1")
  var li_img = [];
  var m_title = document.querySelector(".movie_detail>h2")
  var M_caddress = document.getElementById("M_caddress")
  //7.22
  //
  // console.log(ul_a);
  var qs = `mid=${location.href.split("?")[1].split("&")[0].split("=")[1]}`;
  qs = qs == "mid=undefined" ? "mid=1" : qs;
  //// console.log(qs);
  ajax({
      url: "https://triangle.applinzi.com/moviesItem",
      type: "get",
      dataType: "json",
      data: qs //参数
    })
    .then(result => {
      // console.log(result.data);
      movie1 = result.data[0];
      moive.style.backgroundImage = `url(${movie1.mimg_url})`;
      //根据传过来的数据修改数据
      m_title.innerHTML = movie1.mtitle;
      m_title.nextElementSibling.innerHTML = movie1.mrank;
      //--并计算场次信息
      showC(movie1.mid);
    });
  //------------
  var ms = `cid=${location.href.split("?")[1].split("&")[1].split("=")[1]}`;
  ms = ms == "cid=undefined" ? "cid=1" : ms;
  //// console.log(ms)
  ajax({
      url: "https://triangle.applinzi.com/cinema",
      type: "get",
      dataType: "json"
    })
    .then(result => {
      // console.log(result);
      var cname = document.querySelector(".mover_place_o_div")
      var m = ms.split("=")[1] - 1
      var res = result.data[m]
      // // console.log(m);
      // // console.log(res);
      cname.innerHTML = `
        <h2>${res.cname}
          <span> ${res.crank}</span>
        </h2>
        <p>${res.caddress} | ${res.cphone}
        </p>
        `
    })

  //------------------------------------
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
      isLogin(); //登录验证
    });
  //--------------------------------------
  ajax({
      url: "https://triangle.applinzi.com/movies",
      type: "get",
      dataType: "json",
    })
    .then(result => {
      // console.log(result.data);
      var list = [32, 15, 13, 22, 39];
      var movie = [];
      for (var i of list) {
        movie.push(result.data[i]);
      }
      // // console.log(movie);
      var ul_right = document.querySelector(".movie_list");
      // // console.log(ul_right);
      for (var item of movie) {
        ul_right.innerHTML +=
          `
        <li>
          <p class="movie_list_data">${item.mdate}&nbsp;&nbsp;上映</p>
          <div class="movie_img">
              <a href="movie.html?mid=${item.mid}&${ms}"><img src="${item.mimg_url}"> </a>
          </div>
          <div class="movie_intro f_r">
            <p class=".movie_name"> ${item.mtitle}
              <span>${item.mrank}</span>
            </p>
            <p class="info">${item.mdirector}</p>
            <p class="info">${item.mperformer}</p>
            <p class="movie_intro_icon">预售</p>
          </div>
        </li>
        `
      }
    })
  // 日期
  var date = document.getElementById("date");
  var mydate = new Date();
  var mym = mydate.getMonth() + 1;
  var myd = mydate.getDate();
  var myt1 = mydate.getHours();
  var myt2 = mydate.getMinutes() > 10 ? mydate.getMinutes() : "0" + mydate.getMinutes();
  var date = document.getElementById("date");
  date.innerHTML = `<div class="datelist">
      <a href="javascript:;"> <span class="active">今天${mym}月${myd}日</span></a>
      <a href="javascript:;"> <span>明天${mym}月${myd+1}日</span></a>
      <a href="javascript:;"> <span>后天${mym}月${myd+2}日</span></a>
    </div>`;

  function showC(mid) {
    var M_caddress = document.getElementById("M_caddress");
    M_caddress.innerHTML = `<li class="dis_b datelist_li">
                            <div class="f_l datelist_time_fl">
                              <p class="start">${myt1+1>=24?myt1+1-24:myt1+1}:${myt2}</p>
                              <p class="end">${myt1+3>=24?myt1+3-24:myt1+3}:${myt2}散场</p>
                            </div>
                            <div class="datelist_language f_l">${movie1.mmsg}</div>
                            <div class="datelist_place f_l font14 "> 3号激光厅 </div>
                            <div class="datelist_price f_l">
                              <p>
                                <span style="margin-left: -2px;
                                font-size: 20px;">￥</span>
                                <span style="padding-right: 7px;
                                  font-size: 20px;">${movie1.mprice}</span>
                                <del>${parseFloat(movie1.mprice)+10}</del>
                              </p>
                            </div>
                            <div class="f_l seat">
                              余位${Math.ceil(Math.random()*80)}%
                            </div>
                            <a href="order.html?mid=${mid}&cid=1">选座购票</a>
                          </li>
                          <li class="dis_b datelist_li">
                            <div class="f_l datelist_time_fl">
                              <p class="start">${myt1+2>=24?myt1+2-24:myt1+2}:${myt2}</p>
                              <p class="end">${myt1+4>=24?myt1+4-24:myt1+4}:${myt2}散场</p>
                            </div>
                            <div class="datelist_language f_l">${movie1.mmsg}</div>
                            <div class="datelist_place f_l font14 "> 7号厅 </div>
                            <div class="datelist_price f_l">
                              <p>
                                <span style="margin-left: -2px;
                              font-size: 20px;">￥</span>
                                <span style="padding-right: 7px;
                                font-size: 20px;">${movie1.mprice}</span>
                                <del>${parseFloat(movie1.mprice)+10}</del>
                              </p>
                            </div>
                            <div class="f_l seat">
                              余位${Math.ceil(Math.random()*80)}%
                            </div>
                            <a href="order.html?mid=${mid}&cid=2">选座购票</a>
                          </li>
                          <li class="dis_b datelist_li">
                            <div class="f_l datelist_time_fl">
                              <p class="start">${myt1+3>=24?myt1+3-24:myt1+3}:${myt2}</p>
                              <p class="end">${myt1+5>=24?myt1+5-24:myt1+5}:${myt2}散场</p>
                            </div>
                            <div class="datelist_language f_l">${movie1.mmsg}</div>
                            <div class="datelist_place f_l font14 "> 8号imax厅 </div>
                            <div class="datelist_price f_l">
                              <p>
                                <span style="margin-left: -2px;
                              font-size: 20px;">￥</span>
                                <span style="padding-right: 7px;
                                font-size: 20px;">${movie1.mprice}</span>
                                <del>${parseFloat(movie1.mprice)+10}</del>
                              </p>
                            </div>
                            <div class="f_l seat">
                              余位${Math.ceil(Math.random()*80)}%
                            </div>
                            <a href="order.html?mid=${mid}&cid=3">选座购票</a>
                          </li>`;
    //------------------
    // 请求电影列表
    var banner_ul = document.querySelector(".banner_ul");
    var ul_a = document.querySelectorAll("#M_caddress a");
    ajax({
        url: "https://triangle.applinzi.com/movies",
        type: "get",
        dataType: "json",
        // data:qs //
      })
      .then(result => {
        // console.log(result);
        var list = result.data;
        var html = "";
        //7.22
        for (var li of list) {
          html += `<li>
            <img src="${li.mimg_url}" alt="mid=${li.mid}">
            <p>${li.mtitle}</p>
            <a href="order.html?mid=${li.mid}&${ms}">选座购票</a>
          </li>`;
        }
        banner_ul.innerHTML = html;
        // setTimeout(function(){
        //点击切换事件 
        li_img = document.querySelectorAll(".banner_ul li img");
        //切换下一张的lis
        lis = document.querySelectorAll(".banner>.banner1 ul>li");
        // // console.log(li_img);
        for (var limg of li_img) {
          // console.log(limg);
          limg.onclick = function (e) {
            var img = e.target;
            // console.log(e,e.target);
            var c_title = img.nextElementSibling.innerHTML;
            // var num = img.parentNode.lastElementChild.innerHTML;

            //动态生成背景
            moive.style.backgroundImage = `url(${img.src})`;
            //动态生成电影标题
            m_title.innerHTML = c_title;
            //动态生成评分
            m_title.nextElementSibling.innerHTML = (Math.random() * 2 + 7).toFixed(1);
            //7.22
            //动态变化id
            qs = img.alt;
            // console.log(qs);
            //7.22
            // 影院a标签传参 

            for (var item of ul_a) {
              item.href = `order.html?${qs}&${ms}`
            }

          }
        }
        leng = "930";
        // },1000)
      })
    // 影院a标签传参 
    for (var item of ul_a) {
      item.href = `order.html?${qs}&${ms}`
    }
  }