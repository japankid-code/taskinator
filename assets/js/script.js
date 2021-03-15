var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    };

var createTaskEl = function(taskDataObj) {
    // create the elements and add classes
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = `<h3 class='task-name'>${taskNameInput}</h3><span class='task-type'>${taskTypeInput}</span>`;
    listItemEl.appendChild(taskInfoEl); // puts a div (adding content) inside the task list item
    tasksToDoEl.appendChild(listItemEl); // adds the entire task list item to the list
}

formEl.addEventListener("submit", taskFormHandler);