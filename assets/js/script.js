let placeholderTask = document.querySelector("#placeholder")
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0;

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