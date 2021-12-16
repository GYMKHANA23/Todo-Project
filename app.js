//SELECTORS
const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');
const todoOption = document.querySelector('.filter-todo')

//EVENTLISTENER
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',checkDelete);
todoOption.addEventListener('click',filterTodo);
document.addEventListener('DOMContentLoaded', getTodoListItem);
  
//FUNCTION
function addTodo(e){
//prevent from refreshing the browser in submiting the form.
e.preventDefault();

//creating a Todo Div
const todoDiv =document.createElement("div");
todoDiv.classList.add("todos");

//creating a li for todo Div
const todoItem =document.createElement("li");
todoItem.innerText = todoInput.value;
todoItem.classList.add("list-item");
todoDiv.appendChild(todoItem);

//Adding a check and trash button
const todocheck = document.createElement("button");
todocheck.classList.add('checkbtn');
todocheck.innerHTML = '<i class="fas fa-check"></i>';
todoDiv.appendChild(todocheck);

const todotrash = document.createElement("button");
todotrash.classList.add('trashbtn');
todotrash.innerHTML = '<i class="fas fa-trash"></i>';
todoDiv.appendChild(todotrash);

//Appending the new div on the ul class todoList
todoList.appendChild(todoDiv);

//Adding todos item on the local storage
saveLocalTodos(todoInput.value);

todoInput.value = "";
}

function checkDelete(e){
  const items = e.target;

  //Delete an Item
  if(items.classList[0] === 'trashbtn'){
    const trash = items.parentElement;
    trash.classList.add('fall')
    deleteTodoListItem(trash);
    trash.addEventListener('transitionend', function(){
    trash.remove();
    }); 
  }

  //Check an Item
  if (items.classList[0] === 'checkbtn'){
    items.parentElement.classList.toggle('completed');
  }

}

function filterTodo (e){
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case 'all':
      todo.style.display = 'flex';
      break;
      case 'completed':
        if(todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }
        else{
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }
        else{
          todo.style.display = 'none';
        }
        break;
    }
  });

}

//Implenting the todo app on the local storage
function saveLocalTodos(todo){
  //checking if i already have a todos list in my storage
  let todos;
  if (localStorage.getItem('todos') === null){
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos' , JSON.stringify(todos));
}


//Getting and adding it on our UI the items from local storage of the todo list
function getTodoListItem(){
   //checking if i already have a todos list in my storage
   let todos;
   if (localStorage.getItem('todos') === null){
     todos = [];
   }
   else {
     todos = JSON.parse(localStorage.getItem('todos'));
   }

   todos.forEach(function(todo){
  //creating a Todo Div
  const todoDiv =document.createElement("div");
  todoDiv.classList.add("todos");
  //creating a li for todo Div
  const todoItem =document.createElement("li");
  todoItem.innerText = todo;
  todoItem.classList.add("list-item");
  todoDiv.appendChild(todoItem);

  //Adding a check and trash button
  const todocheck = document.createElement("button");
  todocheck.classList.add('checkbtn');
  todocheck.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(todocheck);

  const todotrash = document.createElement("button");
  todotrash.classList.add('trashbtn');
  todotrash.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(todotrash);

  //Appending the new div on the ul class todoList
  todoList.appendChild(todoDiv);
   });
}

//Deleting an item from the ui to the local storage of the todoList App


function deleteTodoListItem(todo){
    //checking if i already have a todos list in my storage
    let todos;
    if (localStorage.getItem('todos') === null){
      todos = [];
    }
    else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todosIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todosIndex) , 1);
    localStorage.setItem('todos' , JSON.stringify(todos));
    
}