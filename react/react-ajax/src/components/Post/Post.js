import React, {Component} from 'react';
import './Post.css';
import {CommentList} from '../';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postInfo: {
				title: null,
				body: null,
				comments: []
			},
			animate: false,
			direction: 'left'
		}
	}
	
	// 포스트 내용이 변경되면 postId에 따라 애니메이션 적용
	componentWillReceiveProps(nextProps) {
		const {title, body, comments} = nextProps;

		if (this.props.postId !== nextProps.postId) {
			const direction = this.props.postId < nextProps.postId ? 'left' : 'right';
			
			this.setState({
				direction,
				animate:true
			});
			
			// 1초짜리 애니메이션이라서 fadeout 반 fadein 반씩 표현한다.
			// sync the props to state 0.5 sec later
			setTimeout( () => {
				this.setState({
					postInfo: {
						title, body, comments
					},
					animate:false
				});
			}, 500);
			return;
		}

		this.setState({
			postInfo: {
				title, body, comments
			}
		})
	}

	render() {
		const {title, body, comments} = this.state.postInfo;
		const {animate, direction} = this.state;
		const animation = animate
			? (direction==='left' ? 'bounceOutLeft' : 'bounceOutRight')
			: (direction==='left' ? 'bounceInRight' : 'bounceInLeft');

		// show nothing when data is not loaded
		if (title === null) {
			return null;
		}

		return (
			<div className={`Post animated ${animation}`}>
				<h1>{title}</h1>
				<p>{body}</p>
				<CommentList comments={comments} />
			</div>
		);
	}
}
export default Post;