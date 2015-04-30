import AppDispatcher from "../dispatcher/AppDispatcher";
import events from "events";
import TodoConstants from "../constants/TodoConstants";
import assign from "object-assign";

var {EventEmitter} = events;
var todos = {};
const CHANGE_EVENT = "change";

/**
 * create a todo item
 * @param  {string} text content of the todo item
 * 
 */
function create(text){
	var id = (+new Date() + Math.floor(Math.random()*99999)).toString(36);
	_todos[id] = {
		id: id,
		complete: false,
		text: text
	};
}

function update(id, updates){
	_todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates){
	for( var id in _todos ){
		update(id, updates);
	}
}

function destroy(id) {
	delete _todos[id];
}

function destroyCompleted(){
	for( var id in _todos ){
		if(_todos[id].complete){
			destroy(id);
		}
	}
}

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

		case TodoConstants.TODO_UNDO_COMPLETE:
			update(action.id, {complete: false});
			TodoStore.emitChange();
			break;

		case TodoConstants.TODO_COMPLETE:
			update(action.id, {complete: false});
			TodoStore.emitChange();
			break;

		case TodoConstants.TODO_UPDATE_TEXT:
			text = action.text.trim();
			if( text ){
				update(action.id, {text: text});
				TodoStore.emitChange();
			}
			break;

		case TodoConstants.TODO_DESTROY: 
			destroy(action.id);
			TodoStore.emitChange();
			break;

		case TodoConstants.TODO_DESTROY_COMPLETED:
			destroyCompleted();
			TodoStore.emitChange();
			break;

		default;


	}
});

export default TodoStore;