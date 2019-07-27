		//--为cart定义全局变量
		var price = 0;
		var count = 0;
		var money = 0;
		var ids = [];
		//--ture_pay 付款
		var tpay = document.querySelector(".ture_pay");
		tpay.onclick = function () { //点击去付款
			//
			var toast0 = document.getElementById("toast0");
			toast0.style.opacity = 1;
			//付款成功就清空cart并刷新(实际是跳转到付款页面执行)
			ids = ids.join(",");
			var qs = `ids=${ids}`;
			// console.log(qs);
			// alert("付款后清空购物车!!!");
			setTimeout(function () {
				var toast = document.getElementById("toast");
				toast0.style.opacity = 0;
				toast.style.opacity = 1;
			}, 5000);
			setTimeout(function () {
				ajax({
						url: "https://triangle.applinzi.com/recart",
						type: "get",
						dataType: "json",
						data: qs //参数
					})
					.then(res => {
						// // console.log(res);
						// location.reload(); //
						location.href = "details.html";
					});
			}, 7000);
		}
		//---日期更新(动态生成日期)
		var info = document.querySelector(".threat_info>li:last-child");
		// // console.log(info);
		var date = document.getElementById("date");
		var mydate = new Date();
		var myw = mydate.getDay();
		var week = ["日", "一", "二", "三", "四", "五", "六"];
		var mym = mydate.getMonth() + 1;
		var myd = mydate.getDate();
		var myt1 = mydate.getHours() > 10 ? mydate.getHours() : "0" + mydate.getHours();
		var myt2 = mydate.getMinutes() > 10 ? mydate.getMinutes() : "0" + mydate.getMinutes();
		// // console.log(myw,mym,myd);
		info.innerHTML = `<span class="font_l">场次：</span> 
                                ${mym}月${myd}号 &nbsp;&nbsp;&nbsp;
                                周${week[(myw)%7]}   &nbsp;&nbsp;&nbsp;
                                ${myt1+1}:${myt2}`;
		//-----计时器15.00
		(function () {
			//  // console.log(1);
			var time = 899000;
			var t = document.querySelector("time");
			var pay = document.getElementsByClassName("ture_pay")[0];
			//  // console.log(pay);
			var d = setInterval(stime, 1000);

			function stime() {
				var m = Math.floor(time / 1000 / 60);
				var s = Math.floor(time / 1000 % 60);
				m < 10 ? m = "0" + m : m;
				s < 10 ? s = "0" + s : s;
				time -= 1000;
				//  // console.log(time); 
				t.innerHTML = `${m}:${s}`;
				if (time == -2000) {
					clearInterval(d);
					alert("已过支付时间");
					t.innerHTML = `00:00`;
					pay.className = "false_pay";
				}
			}
		})()
		//-------请求购物车cart---------------
		ajax({
				url: "https://triangle.applinzi.com/cart",
				type: "get",
				dataType: "json"
			})
			.then(res => {
				// // console.log("cart",res);
				var list = res.data;
				var seat = document.querySelector(".seat");
				var html = "";
				for (var li of list) {
					html += `<li><i></i>${li.row}排${li.col}座<em></em></li>`;
					//同时给ids添加进去
					ids.push(li.cid);
				}
				count = list.length; //数量
				seat.innerHTML = html;
				//-------请求单个电影-------------
				var mid = location.href.split("=")[1];
				var qs = 'mid=' + mid;
				ajax({
						url: "https://triangle.applinzi.com/moviesItem",
						type: "get",
						dataType: "json",
						data: qs //参数
					})
					.then(res => {
						// // console.log("电影",res);
						//--更换标题..
						var title_p = document.querySelector(".title_p");
						title_p.innerHTML = res.data[0].mtitle;
						var title_languge = document.querySelector(".title_languge");
						title_languge.innerHTML = `<span>${res.data[0].mmsg}</span>`;
						//--计算价格
						price = res.data[0].mprice.toFixed(2);
						var pay_number = document.querySelector(".pay_number");
						var total = document.querySelector(".price");
						money = price * count;
						// console.log(price,pay_number);
						total.innerHTML = `¥${money}`;
						pay_number.innerHTML = `¥${money}`;
					});
				//-----请求用户号码
				if (list[0] == undefined) {
					return;
				}
				var qs = `uid=${list[0].user_id}`;
				ajax({
						url: "https://triangle.applinzi.com/user",
						type: "get",
						dataType: "json",
						data: qs //参数
					})
					.then(res => {
						// console.log("用户",res);
						var phone_p = document.querySelector(".phone_p>span");
						phone_p.innerHTML = res.data[0].phone;
					});
			});
		//=====请求页头=============
		ajax({
				url: "https://triangle.applinzi.com/header.html",
				type: "get",
				dataType: "html"
			})
			.then(res => {
				// // console.log(res);
				var header_html = document.getElementById("header_html");
				header_html.innerHTML = res;
				//调用isLogin
				isLogin();
			});