import CommentBox from './commentbox';
import React from "react";
class Person {
	constructor(name){
		this.name = name;
	}
	getName(){
		return this.name;
	}
	setName(name){
		this.name = name;
	}
}


React.render(<CommentBox />, document.getElementById("content"))


export default Person;