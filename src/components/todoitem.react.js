import React from "react";
import TodoActions from "../actions/TodoActions";
import TodoTextInput from "./todotextinput";
import cx from "react/lib/cx";

let ReactPropTypes = React.PropTypes;

class TodoItem extends React.Component{
	constructor(props){
		super(props)
		this._methodsToBind = [
			"render",
			"_onSave",
			"_onToggleComplete",
			"_onDoubleClick",
			"_onDestroyClick"
		];

		this.render = this.render.bind(this);
		this._onSave = this._onSave.bind(this);
		this._onToggleComplete = this._onToggleComplete.bind(this);
		this._onDoubleClick = this._onDoubleClick.bind(this);
		this._onDestroyClick = this._onDestroyClick.bind(this);

		this.state = {
			isEditing: false
		};

	}
	_bindMethods(){
		let methods = this._methodsToBind;
		for( var meth in methods ){
			this[meth] = this[methods[meth]].bind(this);
		}
	}
	render(){
		let todo = this.props.todo;
		let input;
		if( this.state.isEditing ){

			input = <TodoTextInput
						className = "edit"
						onSave = {this._onSave}
						value = {todo.text}
					/>


		}

		return (
			<li
				className = { cx({ 'completed': todo.complete, 'editing': this.state.isEditing })}
				key={todo.id}>
				<div className = "view">
					<input className="toggle"
						type="checkbox"
						checked={this.props.todo.complete}
						onChange={this._onToggleComplete}
					/>
					<label onDoubleClick={this._onDoubleClick}>
						{todo.text}
					</label>
					<button className="destroy" onClick={this._onDestroyClick} />
				</div>
				{input}
			</li>
		);
	}

	_onToggleComplete(){
		TodoActions.toggleComplete(this.props.todo);
	}

	_onDoubleClick(){
		this.setState({isEditing: true});
	}

	_onSave(text){
		TodoActions.updateText(this.props.todo.id, text);
		this.setState({isEditing: false});
	}

	_onDestroyClick(){
		TodoActions.destroy(this.props.todo.id);
	}
}

TodoItem.propTypes = {
	todo: ReactPropTypes.object.isRequired
};

export default TodoItem;
