import AppDispatcher from "../dispatcher/AppDispatcher";
import TodoConstants from "../constants/TodoConstants";

let TodoActions = {
	/*
	*@param {string} text
	*/
	create: function(text){
		
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		});
	},
	/**
	 * [updateText action creator for updating the todo item]
	 * @param  {number} id - Id of the todo item to be updated
	 * @param  {string} text 
	 * 
	 */
	updateText: function(id, text){
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATE_TEXT,
			id: id,
			text: text
		});
	},

	/**
	 * [toggleComplete - toggle whether a single todo is complete]
	 * @param  {object} todo
	 * 
	 */
	toggleComplete: function(todo){
		let id = todo.id;
		let actionType = todo.complete? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE

		AppDispatcher.dispatch({
			actionType: actionType,
			id: id
		});
	},
	/**
	 * [toggleCompleteAll mark all todos as complete]
	 * 
	 */
	toggleCompleteAll: function(){
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
		});
	},
	/**
	 * destroy - removes todo
	 * @param  {number} id
	 * 
	 */
	destroy: function(id){
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY,
			id: id
		});
	},
	/**
	 * destroyCompleted - delete all the completed todos
	 * 
	 */
	destroyCompleted: function(){
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY_COMPLETED
		});
	}
};

export default TodoActions;