var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content")
var tasks = [];

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    var statusValue = document.querySelector("select[name='task-type']").value.toLowerCase();
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
            type: taskTypeInput,
            status: statusValue
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
    if (taskDataObj.status === "to do") {
        tasksToDoEl.appendChild(listItemEl);
    } else if (taskDataObj.status === "in progress") {
        tasksInProgressEl.appendChild(listItemEl);
    } else if (taskDataObj.status === "complete") {
        tasksCompletedEl.appendChild(listItemEl);
    } // adds the entire task list item to the list
    taskDataObj.id = taskIdCounter; // adds task id of newly created task to the object
    tasks.push(taskDataObj); // adds to the list of tasks
    taskIdCounter++;
    saveTasks();
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
    // loop through tasks array and updates task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].type = taskType;
        }
    };
    saveTasks();
}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`)
    var updatedTaskArr = [];
    // loop through current tasks, pushing keepers to the new array, ditching deleted
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i])
        }
    }
    // reassign tasks to updatedTasksArr so they are the same (neither contain the deleted task)
    tasks = updatedTaskArr;
    taskSelected.remove();
    saveTasks();
}

var taskStatusChangeHandler = function(e) {
    // get task id, currently selected option, find parent, move it to list (in var at top)
    var taskId = e.target.getAttribute("data-task-id");
    var statusValue = e.target.value.toLowerCase();
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`)
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    // update task's object in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
        }
    }
    saveTasks();
}

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {
    //get task item from localStorage
    // convert item from string format back to array
    // iterate thru array, keeping those task elements on the page
    tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
    for (var i = 0; i < tasks.length; i++) {
        tasks[i].id = taskIdCounter;
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        listItemEl.setAttribute("data-task-id", tasks[i].id);
        var taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = `<h3 class='task-name'>${tasks[i].name}</h3><span class='task-type'>${tasks[i].type}</span>`;
        listItemEl.appendChild(taskInfoEl);
        var taskActionsEl = createTaskActions(tasks[i].id);
        listItemEl.appendChild(taskActionsEl);
        if (tasks[i].status === "to do") {
            // listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.appendChild(listItemEl);
        } else if (tasks[i].status === "in progress") {
            // listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.appendChild(listItemEl);
        } else if (tasks[i].status === "complete") {
            // listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.appendChild(listItemEl);
        }
        taskIdCounter++;
        console.log(listItemEl);
    }
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler)
pageContentEl.addEventListener("change", taskStatusChangeHandler)