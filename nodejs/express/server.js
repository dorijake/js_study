const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

// HTML 위치 정의
app.set('views', __dirname + '/views');
// 렌더링 엔진 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const server = app.listen(3000, function() {
	console.log("Express server has started on port 3000.");
});

// 정적 파일을 사용하려면 express.static() 함수 사용.
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/*
secret: 쿠키 변조 방지 sign, 원하는 값으로 설정
resave: 변경이 없어도 세션을 항상 저장할지 설정, false 권장
saveUninitialized: 새로 생겼지만 변경되지 않은 세션 저장. true 권장
*/
app.use(session({
	secret: '@#@$MYSIGN#@$#$',
	resave: false,
	saveUninitialized: true
}));

const router = require('./router/main')(app, fs);

