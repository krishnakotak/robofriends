import React, { Component } from 'react';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {

	constructor(){
		super()
		this.state = {
			robots: [],
			searchField: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots: users}));
	}

	onSearchFieldChange = (event) => {
		this.setState({searchField: event.target.value});
	}

	render(){
		const { robots, searchField } = this.state
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		return !robots.length ? 
		<h2>Loading...</h2> : 
		(
			<div className="tc">
			<h2 className="f2">RoboFriends</h2>
			<SearchBox onSearchChange={this.onSearchFieldChange}/>
			<Scroll>
				<ErrorBoundry>
					<CardList robots={filteredRobots}/>
				</ErrorBoundry>
			</Scroll>
			</div>
		);
	}
	
}

export default App;