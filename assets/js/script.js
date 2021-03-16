var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    } // data repackaged as an object to be sent to createTaskEl below
    createTaskEl(taskDataObj);
    formEl.reset();
    };

var createTaskEl = function(taskDataObj) {
    // create the elements and add classes
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-type'>${taskDataObj.type}</span>`;
    listItemEl.appendChild(taskInfoEl); // puts a div (adding content) inside the task list item
    tasksToDoEl.appendChild(listItemEl); // adds the entire task list item to the list
    taskIdCounter++;
}

formEl.addEventListener("submit", taskFormHandler);