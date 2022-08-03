
"use strict"
class Hello {
	val = "";
	bind(...args){
		let a = "";
		for (const arg of args){
			a += arg + " "
		}
		return a;
	}
}

const a = new Hello();

const b = a.bind("Hello", "World", "See", "You", "Again");
console.log(b);
``