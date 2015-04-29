import AppDispatcher from "../dispatcher/AppDispatcher";
import events from "events";
import TodoConstants from "../constants/TodoConstants";
import assign from "object-assign";

var {EventEmitter} = events;
var todos = {};
const CHANGE_EVENT = "change";

var TodoStore = assign({}, EventEmitter.prototype, {
	/**
	 * Tests whether all remaining items are marked as complete.
	 * @return {boolean}
	 */
	areAllComplete: function(){
		for( var id in _todos ){
			if(! _todos[id].complete ){
				return false;
			}
		}
		return true;
	},
	/**
	 * get entire collection of todos
	 * @return {object}
	 */
	getAll: function(){
		return _todos;
	},
	/**
	 * Emits an  event
	 * 
	 */
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	/**
	 * allows controller views to register event listeners for
	 * store's change event
	 * @param {Function}
	 */
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},
	/**
	 * removes the change event listener
	 * @param  {Function}
	 * 
	 */
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	}
});

// Registering the store with the dispatcher

AppDispatcher.register(function(action){
	var text;
	switch(action.actionType){

		case TodoConstants.TODO_CREATE:
			text = action.text.trim();
			if( text ){
				create(text);
				TodoStore.emitChange();
			}
			break;

		case TodoConstants.TODO_TOGGLE_COMPLETE_ALL: 
			if(TodoStore.areAllComplete()){
				updateAll({complete: false});
			} else {
				updateAll({complete: true});
			}
			TodoStore.emitChange();
			break;


	}
});
