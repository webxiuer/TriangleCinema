/*找到要挂载的元素*/
var uls = document.querySelectorAll("._select>ul")[0];
// console.log(uls)
//创建文档片段
var frag = document.createDocumentFragment();
// console.log(frag)
//span的个数
var rows = 20;
//li的个数
var cols = 14;
//列
var col = 0;
//行
var row = 0;
//movies3下的p
var m3p;

//循环创建li中的li（行）
for (var n = 0; n < cols; n++) {
	var col = 0;
	var lis = document.createElement("li");
	lis.className = "li_row";
	row++;
	frag.appendChild(lis);
	if (n == 3) {
		lis.style.marginBottom = "62px"
	}
	//循环创建span（列）
	for (var i = 0; i < rows; i++) {

		//创建新元素
		var span = document.createElement("span")
		//给新元素span添加自定义属性
		col++;
		span.setAttribute("data-row", row);
		span.setAttribute("data-col", col);
		span.className = "row";
		var sp = span.getAttribute("data-col");
		var wp = span.getAttribute("data-row");

		// var span_5=document.querySelector(".rows>ul>li:nth-child(5)>span")

		//// console.log(wp);
		if (sp > 16 && col < 19) {
			this.span.style.backgroundImage = "url()";
		}

		lis.appendChild(span);
	}
}
uls.appendChild(frag);
/*利用事件委托给span绑定点击事件*/
var lis = [];
lis = document.getElementsByClassName("li_row");
//查找最后一排情侣座 
var lovers = [];
var lovers = document.querySelectorAll("._select>ul>li:last-child>span");
for (var love of lovers) {
	love.style.backgroundPosition = "0px -100px";
	if (!(love.getAttribute("data-col") % 2) == 0) {
		love.style.width = "42px";
		love.style.marginRight = "0";
		love.style.paddingRight = "14px";
	} else {
		love.style.marginRight = "14px;";
		love.style.paddingRight = "0";
	}
}

for (var li of lis) {
	li.onclick = function (e) {
		// console.log(e.target);
		if (e.target.nodeName != "SPAN") {
			return
		}
		if (e.target.getAttribute("data-col") == 17) {
			return
		}
		if (e.target.getAttribute("data-col") == 18) {
			return
		}
		m3p = document.querySelector(".ditalis_mover3").children;
		//普通座位事件
		var span = e.target;
		if (span.getAttribute("data-row") != 14) {
			var spanr = span.getAttribute("data-row");
			var spanc = span.getAttribute("data-col");
			var bg_PO = span.style.backgroundPosition;

			if (bg_PO == "0px -32px") {
				// // console.log(bg_PO);
				remove(spanr, spanc);
				span.style.backgroundPosition = "0px -1px";
				active();
			} else {
				if (m3p.length >= 7) {
					message();
					return;
				}
				span.style.backgroundPosition = "0px -32px";
				//获取元素的row和col坐标位置，
				//调用addToP
				addToP(spanr, spanc);
				active();
			}

		} else {
			//情侣座位事件
			//// console.log(span.getAttribute("data-col"));
			//如果点击的座位的col坐标是奇数
			if (span.getAttribute("data-col") % 2 == 1) {
				// // console.log(e.target.nextElementSibling)
				//创建边量，获取当前元素的背景坐标
				var bg_PO = span.style.backgroundPosition;

				//创建边量，找到当前触发事件元素的下一个兄弟
				var span2 = span.nextElementSibling;
				//获取自定义属性值
				var span1Y = span.getAttribute("data-col");
				var span1X = span.getAttribute("data-row");
				var span2Y = span2.getAttribute("data-col");
				var span2X = span2.getAttribute("data-row");
				// addToP(span1X,span1Y);
				// addToP(span2X,span2Y);
				//如果当前元素是未选中
				if (bg_PO == "0px -100px") {
					//就变为选中状态
					if (m3p.length >= 7) {
						message();
						return
					}
					// var span2=span.nextElementSibling;
					addToP(span1X, span1Y);
					addToP(span2X, span2Y);
					span.style.backgroundPosition = "0px -32px";
					span2.style.backgroundPosition = "0px -32px";
					active();
				} else {
					//将元素的状态还原
					remove(span1X, span1Y);
					remove(span2X, span2Y)
					span.style.backgroundPosition = "0px -100px";
					span2.style.backgroundPosition = "0px -100px";
					active();
				}

			} else {

				var bg_PO = span.style.backgroundPosition;
				//找到触发元素的上个兄弟
				var span2 = span.previousElementSibling;
				var span1Y = span.getAttribute("data-col");
				var span1X = span.getAttribute("data-row");
				var span2Y = span2.getAttribute("data-col");
				var span2X = span2.getAttribute("data-row");

				//改变他的状态
				if (bg_PO == "0px -100px") {
					//找到span的下一个元素
					// // console.log("77");
					// if(m3p.length>=7){return}
					// // console.log("777");
					// var span2=span.nextElementSibling;
					if (m3p.length >= 7) {
						message();
						return;
					}
					addToP(span1X, span1Y);
					addToP(span2X, span2Y);
					span.style.backgroundPosition = "0px -32px";
					span2.style.backgroundPosition = "0px -32px";
					active();
				} else {
					//讲span的上一个元素还原 
					span.style.backgroundPosition = "0px -100px";
					span2.style.backgroundPosition = "0px -100px";
					remove(span1X, span1Y);
					remove(span2X, span2Y);
					active();
				}

			}
		}
	}
}
/*显示选中座位  */
function addToP(sr, sc) {
	//创建p元素挂载到DOM树
	var ditalis = document.getElementsByClassName("ditalis_mover3")[0];
	var div_1 = document.createElement("div");
	var p_1 = document.createElement("p");
	// p_1.innerHTML=spanr+"排"+spanc+"座";
	p_1.innerHTML = sr + "排" + sc + "座";
	div_1.className = "ditalis_div"
	p_1.className = "ditalis_p"
	no_c.style.display = "none";
	div_1.appendChild(p_1);
	ditalis.appendChild(div_1);

}
/*删除显示座位*/
function remove(sr, sc) {
	for (var p of m3p) {
		if (p.textContent == sr + "排" + sc + "座") {
			p.remove();
		}
	}
}
/*订座提示*/
function message() {
	var mse = document.getElementsByClassName("message")[0];
	// console.log(mse)
	mse.style.height = 200 + "px";
	setTimeout(function () {
		mse.style.height = 0 + "px";
	}, 3000)
}
/* 选座按钮禁用 */
function active() {
	var a = document.getElementById("tocart");
	var divps = document.querySelectorAll(".ditalis_mover3>div");
	if (divps.length > 0) {
		a.className = "active";
		a.onclick = tobuy;
		// console.log("启用");
	} else {
		a.classList.remove("active");
		a.onclick = null;
		// console.log("禁用");
	}
	//--重新计算票数和总价
	var total = price * divps.length;
	var ditalis_mover4 = document.querySelector(".ditalis_mover4");
	ditalis_mover4.innerHTML = `
		<p>票数：<span>${divps.length}张</span></p>
		<p>总价：<span>${total.toFixed(2)}元</span></p>`;
}


//7.22
(function () {
	var qs = `mid=${location.href.split("?")[1].split("&")[0].split("=")[1]}`;
	qs = qs == "mid=undefined" ? "mid=1" : qs;
	var ms = `mid=${location.href.split("?")[1].split("&")[1].split("=")[1]}`;
	ms = ms == "cid=undefined" ? "cid=1" : ms;
	// console.log(qs,ms);
	ajax({
			url: "https://triangle.applinzi.com/moviesItem",
			type: "get",
			dataType: "json",
			data: qs //参数
		})
		.then(res => {
			// console.log("电影",res);
			price = res.data[0].mprice.toFixed(2);
			var order_moive_img = document.querySelector(".ditalis_mover>img");
			var order_moive_div = document.querySelector(".ditalis_mover>div").children;
			// console.log(order_moive_div,order_moive_img);
			order_moive_img.src = res.data[0].mimg_url
			for (var i = 0; i <= 2; i += 2) {
				i == 0 ? order_moive_div[i].innerHTML = res.data[0].mtitle : order_moive_div[i].innerHTML =
					res.data[0].mmsg;
			}
		});
})()

//---------------
//更新日期
var date = document.getElementById("date");
var mydate = new Date();
var myw = mydate.getDay();
var week = ["日", "一", "二", "三", "四", "五", "六"];
var mym = mydate.getMonth() + 1;
var myd = mydate.getDate();
var myt1 = mydate.getHours() > 10 ? mydate.getHours() : "0" + mydate.getHours();
var myt2 = mydate.getMinutes() > 10 ? mydate.getMinutes() : "0" + mydate.getMinutes();
var datep = document.querySelector(".ditalis_mover2>p:last-child");
// console.log(datep);
datep.innerHTML = //更新时间
	`场次：<span>${mym}月${myd}日 周${week[(myw)%7]} ${myt1}:${myt2}</span>`;
//请求页头
ajax({
		url: "https://triangle.applinzi.com/header.html",
		type: "get",
		dataType: "html"
	})
	.then(res => {
		//// console.log(res);
		var header_html = document.getElementById("header_html");
		header_html.innerHTML = res;
		isLogin(); //验证登录状态
	});
//点击确认提交发送请求
var tocart = document.getElementById("tocart");
tocart.onclick = tobuy;

function tobuy() {
	//--遍历p
	var m3p = document.querySelectorAll(".ditalis_mover3>div>p");
	// console.log(m3p);
	for (var p of m3p) {
		// console.log(p.innerHTML);
		var row = p.innerHTML.split("排")[0];
		var col = p.innerHTML.split("排")[1].split("座")[0];
		// console.log(row,col);
		//向购物车插入数据
		var mid = 1;
		var qs = `mid=${mid}&row=${row}&col=${col}`;
		ajax({
				url: "https://triangle.applinzi.com/tocart",
				type: "post",
				dataType: "json",
				data: qs //
			})
			.then(result => {
				// console.log(result);
			})
	}
	// alert("即将去付款");
	var toast=document.getElementById("toast");
	toast.style.opacity=1;
	//跳转
	//获取地址栏mid
	var mid = location.search.split("&")[0].split("=")[1];
	setTimeout(function () {
		location.href = "shop.html?mid=" + mid;
	}, 1000);
}
//7.22