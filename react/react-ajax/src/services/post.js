import axios from 'axios';

export function getPost(postId) {
	return axios.get('https://jsonplaceholder.typicode.com/posts/' + postId);
}

export function getComments(postId) {
	// ${}는 문자열 내부에 변수를 넣을 때 사용된다. 
	// ** 문자열을 감싸는 따옴표는 숫자 1 왼쪽에 있는 문자이다.(``)
	return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
}
