import React from "react";
import TodoActions from "../actions/TodoActions";
import TodoItem  from "./todoitem.react";
let ReactPropTypes = React.PropTypes;

class MainSection extends React.Component{
	constructor(props){
		super(props);

		this._methodsToBind = [
			"render"
		]

		this.render = this.render.bind(this);

	}
	_bindMethods(){
		let methods = this._methodsToBind;
		for( var meth in methods ){
			this[meth] = this[methods[meth]].bind(this);
		}
	}
	render(){

		if( Object.keys(this.props.allTodos).length < 1 ){
			return null;
		}

		let allTodos = this.props.allTodos,
			todos = [];

		for(var key in allTodos ){
			todos.push(<TodoItem key={key} todo = {allTodos[key]} />)
		}

		return (
			<section id = 'main'>
				<input 
					id="toggle-all"
					type="checkbox"
					onChange = {this._onToggleCompleteAll}
					checked = {this.props.areAllComplete ? 'checked': ''}
				/>
				<label htmlFor="toggle-all">Mark All as complete</label>
				<ul id="todo-list">{todos}</ul>
			</section>
		);
	}

	_onToggleCompleteAll(){
		TodoActions.toggleCompleteAll();
	}
}

MainSection.propTypes = {
	allTodos: ReactPropTypes.object.isRequired,
	areAllComplete: ReactPropTypes.bool.isRequired
};

export default MainSection;