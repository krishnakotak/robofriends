import React, { Component } from 'react';
import Scroll from './Scroll';
import CardList from './CardList';
import SearchBox from './SearchBox';
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
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
		})
		if (this.state.robots.length === 0){
			return <h2>Loading...</h2>
		}else {
			return(
				<div className="tc">
				<h2 className="f2">RoboFriends</h2>
				<SearchBox onSearchChange={this.onSearchFieldChange}/>
				<Scroll>
					<CardList robots={filteredRobots}/>
				</Scroll>
				</div>
				);
		}
	}
	
}

export default App;