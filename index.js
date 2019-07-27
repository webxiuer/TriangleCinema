/*============ app.js ============*/
//1.引入第三方模块(express mysql cors session)
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// const session = require("express-session");
//引入body-parser模块
const bodyParser = require('body-parser');

//2.配置第三方模块
//2.1配置连接池
var pool = mysql.createPool({
  host: "w.rdc.sae.sina.com.cn",
  user: "3ynwn4oj4n",
  password: "kwiwxk4kky5hj54wxm00xkh0hxxw0i32k54wxjml",
  port: 3306,
  database: "app_triangle",
  connectionLimit: 15
});
//创建服务器
var server = express(); //
//2.2跨域:
server.use(cors({
  origin: "*", //通配
  credentials: true //
}));
//session
// server.use(session({
//   secret:"128位字符串", //用于加密数据使用
//   resave:true, //每次请求需要更新数据
//   saveUninitialized:true //保存初始化数据
// }));

//托管静态资源托管到public
//使用中间件static
server.use(express.static('public'));
//启动服务器
server.listen(5050);

//使用中间件body-parse(在路由前面)
//将post请求的数据格式化为对象
server.use(bodyParser.urlencoded({
  extended: false
}));

//3.各种路由
//--登录: login
server.post("/login", (req, res) => {
  //1:参数
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  // console.log(uname,upwd);
  //1.1:正则表达式验证用户名或密码(自己)
  var reg1 = /^\w{3,16}$/i; //验证用户名格式
  var reg2 = /^\w{6,16}$/i; //验证密码格式
  if (!reg1.test(uname) == true) {
    res.send({
      code: -2,
      msg: "用户名不合规"
    });
    return;
  } else if (!reg2.test(upwd) == true) {
    res.send({
      code: -2,
      msg: "密码不合规"
    });
    return;
  } else { //
    //2:sql
    var sql = "SELECT uid,uname FROM tri_user WHERE uname=? AND upwd=md5(?)";
    //3:json
    pool.query(sql, [uname, upwd], (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        res.send({
          code: -1,
          msg: "用户名或密码有误"
        });
      } else {
        res.send({
          code: 1,
          msg: "登录成功",
          user: result
        });
      }
    });
  }
});

//--注册: post
//验证用户名是否存在
server.get("/uname_check", (req, res) => {
  //1.参数
  var uname = req.query.uname;
  // console.log(uname);
  //2.sql
  var sql = "SELECT * FROM tri_user WHERE uname=?";
  //3.查询并返回结果
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    // // console.log(result);
    if (result.length > 0) {
      res.send({
        code: 3,
        msg: "用户名已存在"
      });
    } else {
      res.send({
        code: -3,
        msg: "用户名可用"
      });
    }
  });
});
//验证手机号
server.get("/phone_check", (req, res) => {
  //1.参数
  var phone = req.query.phone;
  // console.log(phone);
  //2.sql
  var sql = "SELECT * FROM tri_user WHERE phone=?";
  //3.查询并返回结果
  pool.query(sql, [phone], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({
        code: 3,
        msg: "手机号已存在"
      });
    } else {
      res.send({
        code: -3,
        msg: "手机号可用"
      });
    }
  });
});
//注册新的用户
server.post("/reg", (req, res) => {
  //1.参数
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  var phone = req.body.phone;
  //2.sql
  var sql = "INSERT INTO tri_user VALUES(null,?,md5(?),?)";
  //3.查询并返回结果
  pool.query(sql, [uname, upwd, phone], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({
        code: 1,
        msg: "注册成功"
      });
    } else {
      res.send({
        code: -1,
        msg: "注册失败"
      });
    }
  });
});
//查询用户信息
server.get("/user", (req, res) => {
  //1.参数
  var uid = req.query.uid;
  //2.sql
  var sql = "SELECT * FROM tri_user WHERE uid=?";
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send({
      code: 1,
      data: result
    });
  });
  //3.json
});

//--显示电影列表
//全部
server.get("/movies", (req, res) => {
  //1.参数
  //2.sql
  var sql = "SELECT * FROM tri_movies";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 1,
      data: result
    });
  });
  //3.json
});
//某一部
server.get("/moviesItem", (req, res) => {
  //1.参数
  var mid = req.query.mid;
  //2.sql
  var sql = "SELECT * FROM tri_movies WHERE mid=?";
  pool.query(sql, [mid], (err, result) => {
    if (err) throw err;
    res.send({
      code: 1,
      data: result
    });
  });
  //3.json
});

//--订票购物车
//-添加到购物车
server.post("/tocart", (req, res) => {
  // //1.参数 直接session拿
  // if(!uid){ //如果没登录
  //   res.send({code:-1,msg:req.session});
  //   return;
  // }
  var uid = 1;
  var mid = req.body.mid;
  var row = req.body.row;
  var col = req.body.col;
  //2.sql
  var sql = "INSERT INTO tri_cart VALUES(?,?,?,?,?)";
  pool.query(sql, [null, uid, mid, row, col], (err, result) => {
    if (err) throw err;
    //3.json
    res.send({
      code: 1,
      data: result
    });
  });
});
//-从购物车查询
server.get("/cart", (req, res) => {
  //1.参数 直接session拿
  // if(!uid){ //如果没登录
  //   res.send({code:-1,msg:"请登录"});
  //   return;
  // }
  var uid = 1;
  //2.sql
  var sql = "SELECT * FROM tri_cart WHERE user_id=?";
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    //3.json
    res.send({
      code: 1,
      data: result
    });
  });
})
//-清空购物车
server.get("/recart", (req, res) => {
  //1.参数
  var ids = req.query.ids; //ids(从网页端发送的需要删除的多个票)
  if (ids == "") {
    return;
  }
  //2.sql
  var sql = `DELETE FROM tri_cart WHERE cid IN (${ids})`;
  pool.query(sql, /*[ids],*/ (err, result) => {
    if (err) throw err;
    //3.json
    if (result.affectedRows > 0) { //判断
      res.send({
        code: 1,
        msg: "删除成功"
      });
    } else {
      res.send({
        code: -1,
        msg: "删除失败"
      });
    }
  });
});

//--影院
server.get("/cinema", (req, res) => {
  //1.参数
  //2.sql
  var sql = "SELECT * FROM tri_cinema";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 1,
      data: result
    });
  });
  //3.json
});

//--