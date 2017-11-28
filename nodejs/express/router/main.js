module.exports = function(app, fs) {
	app.get('/', (req, res) => {
		let sess = req.session;

		// Json 데이터를 render의 두번째 인자로 넘겨서 페이지 내부에서 데이터 사용가능
		res.render('index', {
			title: 'MY HOMEPAGE',
			length: 5,
			name: sess.name,
			username: sess.username
		});
	});

	app.get('/list', (req, res) => {
		let filename = 'user.json';

		//readfile(path, encoding, callback(err, data))
		fs.readFile(__dirname + "/../data/" + filename, 'utf8', (err, data) => {
			console.log(data);
			res.end(data);
		});
	});
	
	// 파라미터 값에 따라서 데이터를 가져온다.
	app.get('/getUser/:username', (req, res) => {
		fs.readFile(__dirname + "/../data/user.json", 'utf8', (err, data) => {
			// json text를 객체로 변환
			let users = JSON.parse(data);

			// json response 전송
			res.json(users[req.params.username]);
		});
	});

	app.post('/addUser/:username', (req, res) => {
		let result = {};
		let username = req.params.username;

		// Check request validity
		if (!req.body["password"] || !req.body["name"]) {
			result["success"] = 0;
			result["error"] = "invalid request";
			res.json(result);
			return;
		}

		// Load data and check duplication
		fs.readFile(__dirname + "/../data/user.json", 'utf8', (err, data) => {
			let users = JSON.parse(data);
			if (users[username]) {
				result['success'] = 0;
				result["error"] = "duplicate";
				res.json(result);
				return;
			}

			users[username] = req.body;

			// Save data
			// writeFile(path, content, encoding, callback(err, data))
			fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", (err, data) => {
				result = {"success": 1};
				res.json(result);
			});
		});
	});
	
	// put은 update용 
	app.put('/updateUser/:username', (req, res) => {
		let result = {};
		let username = req.params.username;

		if (!req.body['password'] || !req.body['name']) {
			result.success = 0;
			result.error = 'invalid request';
			res.json(result);
			return;
		}

		fs.readFile(__dirname + '/../data/user.json', 'utf8', (err, data) => {
			let users = JSON.parse(data);
			users[username] = req.body;

			fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', (err, data) => {
				result.success = 1;
				res.json(result);
			});
		});
	});

	app.delete('/deleteUser/:username', (req, res) => {
		let result = {};

		// load data
		fs.readFile(__dirname + '/../data/user.json', 'utf8', (err, data) => {
			let users = JSON.parse(data);

			// NOT found
			if (!users[req.params.username]) {
				result['success'] = 0;
				result['error'] = 'not found';
				res.json(result);
				return;
			}

			delete users[req.params.username];
			fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', (err, data) => {
				result['success'] = 1;
				res.json(result);
				return;
			});
		});
	});

	// Login API
	app.get('/login/:username/:password', (req, res) => {
		let sess;
		sess = req.session;

		fs.readFile(__dirname + '/../data/user.json', 'utf-8', (err, data) => {
			let users = JSON.parse(data);
			let username = req.params.username;
			let password = req.params.password;
			let result = {};
			if (!users[username]) {
				result.success = 0;
				result.error = 'not found';
				res.json(result);
				return;
			}

			if (users[username]['password'] == password) {
				result.success = 1;
				sess.username = username;
				sess.name = users[username]['name'];
				res.json(result);
			} else {
				result.success = 0;
				result.error = 'incorrect';
				res.json(result);
			}
		});
	});

	// Logout API
	app.get('/logout', (req, res) => {
		sess = req.session;
		if (sess.username) {
			req.session.destroy( (err) => {
				if (err) console.log(err);
				else res.redirect('/');
			})
		} else {
			res.redirect('/');
		}
	});
}