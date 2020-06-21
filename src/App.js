import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots';

class App extends Component {

	constructor(){
		super()
		this.state = {
			robots: robots,
			searchField: ''
		}
	}

	onSearchFieldChange = (event) => {
		this.setState({searchField: event.target.value});
	}

	render(){
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
		})
		return(
			<div className="tc">
			<h2>RoboFriends</h2>
			<SearchBox onSearchChange={this.onSearchFieldChange}/>
			<CardList robots={filteredRobots}/>
			</div>
			);
	}
	
}

export default App;