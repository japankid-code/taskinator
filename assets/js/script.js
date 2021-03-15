var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    // create the elements and add classes
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = `<h3 class='task-name'>${taskNameInput}</h3><span class='task-type'>${taskTypeInput}</span>`;
    tasksToDoEl.appendChild(listItemEl); // adds the task list item to the list
    listItemEl.appendChild(taskInfoEl); // puts a div (adding content) inside the task list item
    };

formEl.addEventListener("submit", createTaskHandler);