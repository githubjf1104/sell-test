var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
	req.url = '/index.html';
	next();
});

app.use(router);

var appData = require('./data.json');

// json卖家数据
var seller = appData.seller;

// json商品数据
var goods = appData.goods;

// json评论数据
var ratings = appData.ratings;

// 编写路由
var apiRoutes = express.Router();

// 所有通过接口相关的api都会通过api这个路由导向到具体的路由
app.use('/api', apiRoutes);

app.get('/api/seller', function (req, res) {
    // 服务端收到请求后返回给客户端一个json数据
    res.json({
      // 当我们数据正常时，我们通过传递errno字符为0表示数据正常
      errno: 0,
      // 返回json中的卖家数据
      data: seller
    });
  });
  app.get('/api/goods', function (req, res) {
    res.json({
      errno: 0,
      data: goods
    });
  });
  app.get('/api/ratings', function (req, res) {
    res.json({
      errno: 0,
      data: ratings
    });
  });

  app.use(express.static('./dist'));

  module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:' + port + '\n');
});