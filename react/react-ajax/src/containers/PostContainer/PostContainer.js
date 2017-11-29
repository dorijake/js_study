import React, {Component} from 'react';
import { PostWrapper, Navigator, Post, Warning } from '../../components';
import * as service from '../../services/post';

export default class PostContainer extends Component {
	constructor(props) {
		super();
		this.state = {
			postId: 1,
			fetching: false, // tells whether the request is waiting for response or not
			post: {
				title: null,
				body: null
			},
			comments: [],
			warningVisibility: false
		}
	}
	componentDidMount() {
		this.fetchPostInfo(1);
	}
	
	showWarning = () => {
		this.setState({
			warningVisibility:true
		});

		setTimeout(() => {
			this.setState({
				warningVisibility:false
			});
		}, 1500);
	}
	// 본래 메서드를 선언하면 생성자에서 바인딩을 해줬어야 하지만
	// Arrow 함수로 선언하면 바인딩이 필요없다.
	// babel 플러그인인 transform-class-properties의 기능(create-react-app 자동 적용)
	fetchPostInfo = async (postId) => {
		this.setState({
			fetching: true // requesting
		});

		try {
			// 여러개의 Promise를 처리할 때에는 Promise.all을 사용한다.
			const info = await Promise.all([
				service.getPost(postId),
				service.getComments(postId)
			]);
			
			const {title, body} = info[0].data;
			const comments = info[1].data;

			this.setState({
				postId,
				post: {
					title,
					body
				},
				comments,
				fetching: false
			});
		} catch(e) {
			this.setState({
				fetching:false, 
			});
			
			this.showWarning();
		}
	}
	
	handleNavigatorClick = (type) => {
		const postId = this.state.postId;

		if (type === 'NEXT') {
			this.fetchPostInfo(postId+1);
		} else {
			this.fetchPostInfo(postId-1);
		}
	}

	render() {
		const {postId, fetching, post, comments, warningVisibility} = this.state;
		return (
			<PostWrapper>
				<Navigator
					postId={postId} 
					disabled={fetching} 
					onClick={this.handleNavigatorClick}
				/>
				<Post
					postId={postId}
					title={post.title}
					body={post.body}
					comments={comments}
				/>
				<Warning 
					message="That post does not exist"
					visible={warningVisibility}
				/>
			</PostWrapper>
		);
	}
}