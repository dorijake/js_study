import React, {Component} from 'react';
import './Warning.css';

class Warning extends Component {
	constructor(props) {
		super(props);

		// closing Animations을 위한 State
		this.state = {
			closing: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.visible && !nextProps.visible) {
			this.setState({
				closing: true
			});

			setTimeout( () => {
				this.setState({
					closing: false
				});
			}, 1000);
		}
	}
	render() {
		const { message, visible } = this.props;
		const { closing } = this.state;

		if (!visible && !closing) return null;
		return(
			<div className="Warning-wrapper" style={{visibility:{visible}}}>
				<div 
					className={`Warning ${closing?'bounceOut':'bounceIn'} animated`}>
					{message}
				</div>
			</div>
		);
	}
}

export default Warning;