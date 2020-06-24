import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { setSearchField } from '../actions.js';

const mapStateToProps = (state) => {
	return {searchField: state.searchField}
}

const mapDispatchToProps = (dispatch) => {
	return {onSearchFieldChange: (event) => dispatch(setSearchField(event.target.value))}
}

class App extends Component {

	constructor(){
		super()
		this.state = {
			robots: []
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots: users}));
	}

	render(){
		const { searchField, onSearchFieldChange } = this.props
		const { robots } = this.state
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		return !robots.length ? 
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