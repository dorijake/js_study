import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './Animation.css'
import Promise from 'promise-polyfill';

// Promise를 지원하지 않는 환경이라면 Promise를 추가해준다.
if (!window.Promise) {
	window.Promise = Promise;
}

ReactDOM.render(<App />, document.getElementById('root'));
