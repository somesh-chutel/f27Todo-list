let todoRootEl = document.getElementById("todoRoot");
let userInputEl = document.getElementById("userInput");


function getTodoFromLocalStorage(){

    let myTodoList = localStorage.getItem("myTodoList");

    if( myTodoList === null ){

        return [];

    }
    else{

        let parsedTodo = JSON.parse(myTodoList); 

        return parsedTodo;

    }

    

  

}



let todoList = getTodoFromLocalStorage();


function onStatusUpdate(titleId,checkBoxId){

    let myTitle = document.getElementById(titleId);
    let myCheckBox = document.getElementById(checkBoxId);

    let findTodoId = checkBoxId[checkBoxId.length-1];

    

    for (each of todoList){

        if( each.id == findTodoId ){

            if( each.isChecked === false){

                each.isChecked = true;

            }
            else{

                each.isChecked = false;

            }

        }
        

    }

    


    if(myCheckBox.checked === true){

        myTitle.classList.add("checked");

    }
    else{

        myTitle.classList.remove("checked");
    }

}


function onDeleteTodo(todoId){

    let myTodo = document.getElementById(todoId);
    
    todoRootEl.removeChild(myTodo);

    

}


function createAndAppendTodo(todo){

    let checkBoxId = "checkbox" + todo.id;
    let titleId = "title" + todo.id;
    let todoId = "todo" + todo.id;

    let todoListEl = document.createElement("li");
    todoListEl.classList.add("todo-list-item");
    todoListEl.id = todoId;
    todoRootEl.appendChild(todoListEl);

    let checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.id = checkBoxId;
    checkBoxEl.onclick = function(){
        onStatusUpdate(titleId,checkBoxId);
    }
    if( todo.isChecked === true){
        checkBoxEl.checked = true;
    }
    todoListEl.appendChild(checkBoxEl);

    let labelEl = document.createElement("label");
    labelEl.classList.add("label-cont");
    labelEl.htmlFor = checkBoxId;
    todoListEl.appendChild(labelEl);

    let titleEl = document.createElement("h5");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;
    if( todo.isChecked === true){

        titleEl.classList.add("checked");

    }
    labelEl.appendChild(titleEl);


    let deleteBTnEl = document.createElement("button");
    deleteBTnEl.classList.add("delete-btn");
    labelEl.appendChild(deleteBTnEl);
    deleteBTnEl.onclick = function(){
        onDeleteTodo(todoId);
    }


    let deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("fa-solid","fa-trash");
    deleteBTnEl.appendChild(deleteIconEl);


}




for (each of todoList){

    createAndAppendTodo(each);

}



function onAddNewTodo(){


    const newTodo = {
        title : userInputEl.value,
        id : todoList.length + 1,
        isChecked : false
    }
    
    
    
    createAndAppendTodo(newTodo);

    todoList.push(newTodo);

    console.log(todoList);

    userInputEl.value = "";

}


function onSaveTodo(){

    let stringifyTodo = JSON.stringify(todoList);

    localStorage.setItem("myTodoList",stringifyTodo);

}


