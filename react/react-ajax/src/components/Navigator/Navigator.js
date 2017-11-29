import React from 'react';
import {Button} from 'semantic-ui-react';
import './Navigator.css';

const Navigator = ({onClick, postId, disabled}) => (
	<div className="Navigator">
		<Button
			color="teal"
			content="Previous"
			icon="left arrow"
			labelPosition="left"
			onClick={() => onClick('PREV')}
			disabled={disabled}
		/>
		<div className="Navigator-page-num">{postId}</div>
		<Button
			color="teal"
			content="next"
			icon="right arrow"
			labelPosition="right"
			className="Navigator-right-button"
			onClick={() => onClick('NEXT')}
			disabled={disabled}
		/>
	</div>
);

export default Navigator;