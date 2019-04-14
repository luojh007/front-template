import React, { Component } from 'react'
import {
	Player, ControlBar, ProgressControl, ReplayControl
} from 'video-react';
import "video-react/dist/video-react.css";
export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTime: '', //播放的时间
		}
	}
	componentDidMount() {
		this.refs.player.subscribeToStateChange(this.handleStateChange);
	}
	handleStateChange = (state, prevState) => {
		// copy player state to this component's state
		let { hasStarted, ended, userActivity, isActive,currentTime,seekingTime} = state;
		let { isStart } = this.state;
		if (isStart == false && hasStarted == true){
			console.log('初次开始');
		}
		this.setState({
			currentTime: state.currentTime,
			isStart: hasStarted,
		});
	}
	onEnded =()=>{
		console.log('结束')
	}
	render() {
		return (
			<div>
				<Player onPlay={this.onPlay} onEnded={this.onEnded} onSeeking={this.onSeeking} onSeeked={this.onSeeked} ref="player"  >
					<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
					<ControlBar autoHide={false} >
						<ReplayControl seconds={10} order={2.2} />
						{/* <ProgressControl disabled /> */}
					</ControlBar>
				</Player>
			</div>
		)
	}
}
