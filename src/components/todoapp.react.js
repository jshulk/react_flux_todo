// top level controller view
import Footer from "./footer.react";
import Header from "./header.react";
import MainSection from "./mainsection.react";
import React from "react";
import TodoStore from "../stores/todostore";

class TodoApp extends React.Component {

	constructor(props){
		super(props)
		this.state = getTodoState();

		this._methodsToBind = ["render", "_onChange"]
		this.render = this.render.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	_bindMethods(){
		let methods = this._methodsToBind;
		for( var meth in methods ){
			this[meth] = this[methods[meth]].bind(this);
		}
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
		let newState = getTodoState();
		this.setState(newState);
	}
}

function getTodoState(){
	return {
		allTodos: TodoStore.getAll(),
		areAllComplete: TodoStore.areAllComplete()
	};
}

export default TodoApp;