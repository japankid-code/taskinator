var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content")

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    var isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else { // no data attribute, create object as usual
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        }; // data repackaged as an object to be sent to createTaskEl below
        createTaskEl(taskDataObj); // gets called if no data-* present
    }
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
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl); // adds the entire task list item to the list
    taskIdCounter++;
}

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
    // create the dropdown menu
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    // create the options inside the select element
    var statusChoices = ["TO DO", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option el with data from the array
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
}

var taskButtonHandler = function(e) {
    targetEl = e.target;
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        beginEditTask(taskId);
    } else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

var beginEditTask = function(taskId) {
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`)
    // narrowing scope of querySelector, get the h3 and span elements from the taskSelected
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // grab the task name and type using the same selector from taskFormHandler
    document.querySelector(`input[name='task-name']`).value = taskName; // = after because update
    document.querySelector(`select[name='task-type']`).value = taskType;
    document.querySelector(`#save-task`).textContent = "Save Task";
    // add data attribute to form, letting us know it is in editing state
    formEl.setAttribute("data-task-id", taskId);
}

var completeEditTask = function(taskName, taskType, taskId) {
    // find the list item
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`)
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`)
    taskSelected.remove();
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler)