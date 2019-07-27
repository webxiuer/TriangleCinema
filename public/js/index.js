    /*轮播*/
    (function () {
      var i = 0; //起始下标,第一张图
      var Lwidth = 717; //每张图的宽度
      var duration = 500; //每次轮播动画持续的时间
      var licount = 4; //li的总个数
      var ulImgs = document.getElementById("ul-imgs"); //找放图片的ul
      var ulIdxs = document.getElementById("ul-idxs"); //找放圆点的ul
      // // console.log(ulIdxs);
      var lis = ulIdxs.children; //每个圆点li
      function moveTo(to) { //定义事件函数
        if (to == undefined) { //如果没有人点，我就加一，让他动
          to = i + 1;
        }
        if (i == 0) { //如果滚动从头开始就重新加上transition
          if (to > i) {
            ulImgs.className = "transition";
            //// console.log(ulImgs,"1111111111")
          } else {
            ulImgs.className = "";
            ulImgs.style.marginLeft = -Lwidth * licount + "px";
            setTimeout(function () {
              moveTo(licount - 1);
            }, 100);
            return;
          }
        }
        i = to;
        ulImgs.style.marginLeft = -i * Lwidth + "px";
        for (var li of lis) {
          li.className = "";
        }
        //  // console.log(i);
        if (i == licount) { //如果当前图片到了最后一张
          //我就让他i=0，回到第一张
          i = 0;
          //异步执行函数
          setTimeout(function () {
            //去掉ulImgs的className，就没有了过渡效果
            ulImgs.className = "";
            //在这一瞬间让margin-left变成0，回到第一张
            ulImgs.style.marginLeft = 0;
          }, duration)
        }
        lis[i].className = "active";
        //// console.log(lis[i])
      }
      var btnLeft = document.getElementById("btn-left");
      var btnRight = document.getElementById("btn-right");
      var canClick = true;
      //// console.log(canClick,"开关0");
      //// console.log(btnRight);
      btnRight.onclick = function () {
        move(1);
      }

      function move(n) {
        if (canClick) {
          //// console.log(i+n);
          moveTo(i + n);
          canClick = false;
          setTimeout(function () {
            canClick = true;
          }, duration + 100);
        }
      }
      btnLeft.onclick = function () {
        move(-1);
      }
      var interval = 3000; //定时器3s
      var timer = setInterval(function () {
        moveTo()
      }, 3000);
      var banner = document.getElementById("banner");
      banner.onmouseover = function () {
        clearInterval(timer);
      }
      banner.onmouseout = function () {
        timer = setInterval(function () {
          moveTo()
        }, 3000);
      }
      //  // console.log(canClick,"开关2"); //
      ulIdxs.onclick = function (e) {
        // // console.log(ulIdxs,"this.ul点击一次"); //
        if (canClick) {
          var li = e.target;
          //// console.log("获取到"+li.nodeName); //
          if (li.nodeName == "LI") { //
            //// console.log("确认");
            if (li.className !== "active") {
              //// console.log("li没有选中"); //
              for (var i = 0; i < lis.length; i++) {
                //// console.log(i)
                if (lis[i] == li) {
                  //// console.log(lis[i]=i);
                  break;
                }
              }
              moveTo(i);
              setTimeout(function () {
                canClick = true;
              }, duration);
            }
          }
        }
      }
    // })();
    /*滚动刘海*/
    // (function () {
      var bangde = document.getElementById("bangde");
      window.onscroll = function () {
        var winScrollTop = document.documentElement.scrollTop;
        if (winScrollTop > 600) {
          bangde.style.height = "72px";
        } else {
          bangde.style.height = "0";
        }
      }
    // })();
    // (function () {
      //-判断当前是否登录
      var Suid = sessionStorage.getItem("Suid");
      var Suname = sessionStorage.getItem("Suname");
      var head_ul_1 = document.querySelector(".head_ul_1");
      if (Suid != null) {
        head_ul_1.innerHTML = `<li>Hi,欢迎来到Triangle</li>
        <li><a href="javascript:;">${Suname}</a></li>
        <li><a href="javascript:sessionStorage.clear();location.reload();" id="logout">退出登录</a></li>`;
      } else {
        head_ul_1.innerHTML = `<li>Hi,欢迎来到Triangle</li>
        <li><a href="login.html">请登录</a></li>
        <li><a href="register.html">免费注册</a></li>`;
      }
      //发送请求获取整个电影表对象
      window.onload = function () {
        ajax({
            url: "https://triangle.applinzi.com/movies",
            type: "get",
            dataType: "json",
            // data:qs //
          })
          .then(result => {
            var list = result.data;
            // // console.log(list);
            var movie_ul = document.getElementById("movie_ul");
            var html = "";
            for (var i = 0; i < 6; i++) {
              // // console.log(list[i]);
              if (i < 5) {
                html += `
              <li>
                <a href="javascript:;">
                  <img src="${list[i].mimg_url}">
                  <span class="movie_grade">${list[i].mrank.toFixed(1)}</span>
                  <div class="movie_name">${list[i].mtitle}</div>  
                  <div class="movie_buyticket"><a href="details.html?mid=${i+1}">选座购票</a></div>
                </a>
              </li>`;
              } else {
                html += `
              <li id="movie_li">
                <a href="javascript:;">
                  <img src="${list[i].mimg_url}">
                  <span class="movie_grade">${list[i].mrank.toFixed(1)}</span>
                  <div class="movie_name">${list[i].mtitle}</div>  
                  <div class="movie_buyticket"><a href="details.html?mid=${i+1}">选座购票</a></div>
                </a>
              </li>`;
              }
            }
            movie_ul.innerHTML = html;
          })
      }
    })();