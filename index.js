// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const completeBtn = document.querySelector(".complete-btn");
const trashBtn = document.querySelector(".trash-btn");
const filterTodo = document.querySelector(".filter-todo");

// EventListeners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterTodo.addEventListener("click", filter);

// CREATING TODOS
function addTodo(e) {
	e.preventDefault();
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	const todo = document.createElement("li");
	todo.innerText = todoInput.value;
	todo.classList.add("todo-item");
	todoDiv.appendChild(todo);
	saveLocalTodos(todoInput.value);

	const completeBtn = document.createElement("button");
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';
	completeBtn.classList.add("complete-btn");
	todoDiv.appendChild(completeBtn);

	const trashBtn = document.createElement("button");
	trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
	trashBtn.classList.add("trash-btn");
	todoDiv.appendChild(trashBtn);

	todoList.appendChild(todoDiv);
	todoInput.value = "";
}

// DELETING TODOS
function deleteTodo(e) {
	const item = e.target;
	const todo = item.parentElement;
	if (item.classList[0] === "complete-btn") {
		todo.classList.toggle("completed");
	}
	if (item.classList[0] === "trash-btn") {
		todo.classList.add("fall");
		todo.addEventListener("transitionend", () => {
			todo.remove();
		});
	}
	removeLocalStorage(todo);
}

//FILTERING TODOS
function filter(e) {
	const todos = todoList.childNodes;
	console.log(todos);
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

//SAVE TODOS IN LOCAL STORAGE
function saveLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

//DELETING TODOS FROM LOCAL STORAGE
function removeLocalStorage(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}

//RANDER TODO FROM LOCAL STORSGE
function getTodos() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function (to) {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");

		const todo = document.createElement("li");
		todo.innerText = to;
		todo.classList.add("todo-item");
		todoDiv.appendChild(todo);
		todoInput.value = "";

		const completeBtn = document.createElement("button");
		completeBtn.innerHTML = '<i class="fas fa-check"></i>';
		completeBtn.classList.add("complete-btn");
		todoDiv.appendChild(completeBtn);

		const trashBtn = document.createElement("button");
		trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
		trashBtn.classList.add("trash-btn");
		todoDiv.appendChild(trashBtn);
		todoList.appendChild(todoDiv);
	});
}
