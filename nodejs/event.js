const events = require("events");

// EventEmitter 
let eventEmitter = new events.EventEmitter();

// eventHandler 함수 생성
let connectHandler = function connected() {
	console.log("connection successful");

	// data_received 이벤트 발생
	eventEmitter.emit('data_received');
}

// connection 이벤트와 connectHandler 이벤트 연동
eventEmitter.on('connection', connectHandler);

// data_received 이벤트와 익명 함수 연동
// 함수를 변수안에 담는 대신, on() 메소드 인자로 함수 전달
eventEmitter.on('data_received', function() {
	console.log('data received');
});

eventEmitter.emit('connection');

console.log('Program has ended');