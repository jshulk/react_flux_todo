// top level controller view
import Footer from "./footer.react";
import Header from "./header.react";
import MainSection from "./mainsection.react";
import React from "react";
import TodoStore from "../store/todostore";

class TodoApp extends React.Component {
	
	getInitialState(){
		return getTodoState();
	}

	componentDidMount(){
		TodoStore.addChangeListener(this._onChange);
	}

	componentWillUnmount(){
		TodoStore.removeChangeListener(this._onChange);
	}

	render(){
		return (
			<div>
				<Header />
				<MainSection allTodos = {this.state.allTodos} areAllComplete = {this.state.areAllComplete} />
				<Footer allTodos = {this.state.allTodos} />
			</div>
		);
	}

	_onChange(){
		this.setState(getTodoState())
	}
}

function getTodoState(){
	return {
		allTodos: TodoStore.getAll(),
		areAllComplete: TodoStore.areAllComplete()
	};
}

export default TodoApp;