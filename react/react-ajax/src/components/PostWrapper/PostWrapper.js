import React from 'react';
import './PostWrapper.css';

const PostWrapper = ({children}) => {
	return (
		<div className="PostWrapper">
			{children} {/* this.props.children */}
		</div>
	);
};

export default PostWrapper;