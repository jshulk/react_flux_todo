import React from "react";
import TodoActions from "../actions/TodoActions";

var ReactPropTypes = React.PropTypes;

class Footer extends React.Component{
	
	constructor(props){
		super(props);
		this.render = this.render.bind(this);
	}
	_bindMethods(){
		let methods = this._methodsToBind;
		for( var meth in methods ){
			this[meth] = this[methods[meth]].bind(this);
		}
	}
	render(){

		let allTodos = this.props.allTodos;
		let total = Object.keys(allTodos).length;
		
		if( total === 0){
			return null;
		}

		let completed = 0;
		for( var key in allTodos ){
			if(allTodos[key].complete){
				completed++;
			}
		}

		let itemsLeft = total - completed;
		let itemsLeftPhrase = itemsLeft === 1 ? ' item ': ' items ';
		itemsLeftPhrase += "left";

		let clearCompleteButton;
		if( completed ){
			clearCompleteButton =
					<button 
						id = "clear-completed"
						onClick = {this._onClearCompletedClick}>
						Clear completed ({completed})
					</button>;
		}

		return (
			<footer id = "footer">
				<span id = "todo-count">
					<strong>
						{itemsLeft}
					</strong>
					{itemsLeftPhrase}
				</span>
				{clearCompleteButton}
			</footer>
		);


	}

	_onClearCompletedClick(){
		TodoActions.destroyCompleted();
	}
}

Footer.propTypes = {
	allTodos: ReactPropTypes.object.isRequired
};

export default Footer;