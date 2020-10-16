let placeholderTask = document.querySelector("#placeholder")
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0;
let pageContentEl = document.querySelector("#page-content");

let taskFormHandler = function(event) {
    //Keeps page from refreshing with every submission
    event.preventDefault();
    // Gets the values for the task name and type
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    // Check for empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("Please complete the task form.");
        return false;
    }
    // Reset form fields
    formEl.reset();
    // Create object to hold task info
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    // Use object as argument in creatTaskEl
    createTaskEl(taskDataObj);
};

let createTaskEl = function(taskDataObj) {
    // Creates <li> and gives it a class
    placeholderTask.remove();
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // Add task id as custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // Same but for a <div>
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // Add to DOM
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // Add to page
    listItemEl.appendChild(taskInfoEl);
    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);
    // Increment task counter
    taskIdCounter++;
};

let createTaskActions = function(taskId) {
    // Wrapper for task actions
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // Edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    // Delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
    // Dropdown
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ["To Do", "In Progress", "Completed"];
    for (let i = 0; i < statusChoices.length; i++) {
        // Create option element
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // Add to dropdown
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

// Adds task with button click or when enter key is pressed
formEl.addEventListener("submit", taskFormHandler);

let taskButtonHandler = function(event) {
    // console.log(event.target);
    if (event.target.matches(".edit-btn")) {
        let taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    } else if (event.target.matches(".delete-btn")) {
        let taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

let deleteTask = function(taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

let editTask = function(taskId) {
    // Get task list item element
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // Get content from task name...
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    // ...and type
    let taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;
    // Change "Add Task to "Save Task"
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

pageContentEl.addEventListener("click", taskButtonHandler);