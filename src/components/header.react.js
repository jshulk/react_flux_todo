import React from "react";
import TodoActions from "../actions/TodoActions";
import TodoTextInput from "./todotextinput";

class Header extends React.Component{
	constructor(props){
		super(props);
		this._methodsToBind = ["render"]
		this.render = this.render.bind(this);
	}

	_bindMethods(){
		let methods = this._methodsToBind;
		for( var meth in methods ){
			this[meth] = this[methods[meth]].bind(this);
		}
	}

	render(){
		
		return (
			<header id = 'header'>
				<h1>Todos</h1>
				<TodoTextInput 
					id = 'new-todo'
					placeholder=' what needs to be done'
					onSave={this._onSave} />
			</header>
		);
	}
	_onSave(text){
		if( text.trim() ){
			TodoActions.create(text);
		}
	}
}

export default Header;