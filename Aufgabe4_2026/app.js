

import TodoItem from './todo-item.js';
const todos = [];

function addTodoItem(text) {
  if (text.trim() !== "") {
    const newItem = new TodoItem(text);
    todos.push(newItem);
  }
}

function removeTodoItem(todo) {
  const index = todos.indexOf(todo);
  if (index !== -1) {
    todos.splice(index, 1);
  }
}

function toggleTodoStatus(todo) {
  todo.toggleCompleted();
}

const todoInput = document.querySelector("#todo-input");
const todoAddButton = document.querySelector("#todo-add");
const todoListPending = document.querySelector("#todo-list");
const todoListDone = document.querySelector("#todo-list-done");

function createTodoElement(todo) {
  const li = document.createElement("li");
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => onTodoStatusChanged(todo));
  
  const span = document.createElement("span");
  span.textContent = ` ${todo.text} `;
  if (todo.completed) {
    span.style.textDecoration = "line-through";
  }
  
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => onDeleteButtonClicked(todo));
  
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  
  return li;
}

function render() {
  todoListPending.innerHTML = "";
  todoListDone.innerHTML = "";
  
  for (const todo of todos) {
    const todoElement = createTodoElement(todo);
    
    if (todo.completed) {
      todoListDone.appendChild(todoElement);
    } else {
      todoListPending.appendChild(todoElement);
    }
  }
}

function onAddButtonClicked() {
  const text = todoInput.value;
  addTodoItem(text);
  todoInput.value = "";
  render();
}

function onDeleteButtonClicked(todo) {
  removeTodoItem(todo);
  render();
}

function onTodoStatusChanged(todo) {
  toggleTodoStatus(todo);
  render();
}

function onKeyDownEvent(e) {
  if (e.key === "Enter") {
    onAddButtonClicked();
  }
}

todoAddButton.addEventListener("click", onAddButtonClicked);
todoInput.addEventListener("keydown", onKeyDownEvent);

render();