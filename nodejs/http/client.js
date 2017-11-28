const http = require('http');

// HttpRequest Option
const options = {
	host: 'localhost',
	port: '8081',
	path: '/index.html'
};

// 콜백 함수로 response를 받아온다
// reponse는 EventEmitter를 상속한 객체이다.
let callback = function(response) {
	// response 이벤트가 감지되면 데이터를 body에 받아온다.
	let body = '';
	response.on('data', (data) => {
		body += data;
	});

	// end 이벤트가 감지되면 데이터 수신을 종료하고 내용을 출력한다.
	response.on('end', () => {
		console.log(body);
	});
}

const req = http.request(options, callback);
req.end();