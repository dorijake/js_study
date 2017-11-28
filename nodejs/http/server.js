const http = require('http');
const fs = require('fs');
let url = require('url');

// server create
http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname;
	console.log('Request for ' + pathname + ' received.');

	// 파일 이름이 비어있다면 index.html로 설정
	if (pathname == '/') {
		pathname = '/index.html';
	}

	// 파일 읽기
	fs.readFile(pathname.substr(1), (err, data) => {
		if (err) {
			console.log(err);
			res.writeHead(404, {'Content-Type': 'text/html'});
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});

			// 파일을 읽어와서 responseBody에 작성
			res.write(data.toString());
		}
		
		// responeseBody 전송
		res.end();
	})
}).listen(8081, () => {
	console.log('Server running at http://localhost:8081/');	
});