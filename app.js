var express = require('express');
var Pusher = require('pusher');

// Pusherの設定
var pusher = new Pusher({
	appId: 'YOUR_APP_ID',
	appKey: 'YOUR_APP_KEY',
	secret: 'YOUR_APP_SECRET'
});

// チャンネルの設定
var channel = pusher.channel('chat');

// Expressの設定
var app = express.createServer();
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {
		layout: false
	});

	app.use(express.bodyParser());
	app.use(app.router);
});

// トップページ
app.get('/', function(req, res) {
	res.render('index');
});

// メッセージ投稿用API
app.post('/post', function(req, res) {
	var data = req.body;
	channel.trigger('message', data, function(err, request, response) {
		res.send(200);
	});
});

app.listen(3000);
