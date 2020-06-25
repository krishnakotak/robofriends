import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { setSearchField, requestRobots } from '../actions.js';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchFieldChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render(){
		const { searchField, onSearchFieldChange, robots, isPending } = this.props
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		return isPending ? 
		<h2>Loading...</h2> : 
		(
		<div className="tc">
		<h2 className="f2">RoboFriends</h2>
		<SearchBox onSearchChange={onSearchFieldChange}/>
		<Scroll>
		<ErrorBoundry>
		<CardList robots={filteredRobots}/>
		</ErrorBoundry>
		</Scroll>
		</div>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(App);