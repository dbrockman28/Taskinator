let placeholderTask = document.querySelector("#placeholder")
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0;
let pageContentEl = document.querySelector("#page-content");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");

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

    let isEdit = formEl.hasAttribute("data-task-id");
    // Check for data attribute, then call edit function if true
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
        // If not, create object as normal and pass to createTaskEl function
    } else {
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    };
};

let createTaskEl = function(taskDataObj) {
    // Creates <li> and gives it a class
    placeholderTask.remove();
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // Add task id as custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // Add drag
    listItemEl.setAttribute("draggable", "true");
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

let completeEditTask = function(taskName, taskType, taskId) {
    // Find matching task list item
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // Set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

let taskStatusChangeHandler = function(event) {
    // Get task items id
    let taskId = event.target.getAttribute("data-task-id");
    //Get option value and convert to lowercase
    let statusValue = event.target.value.toLowerCase();
    // Find the parent task item element based on id
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // Determine status and append accordingly
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};

let dragTaskHandler = function(event) {
    let taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    let getId = event.dataTransfer.getData("text/plain");
    // console.log("getId:", getId, typeof getId);
};

let dropZoneDragHandler = function(event) {
    let taskListEl = event.target.closest(".task-list");
     if (taskListEl) {
         event.preventDefault();
     
     }
};

let dropTaskHandler = function(event) {
    let id = event.dataTransfer.getData("text/plain");
    let draggableElement = document.querySelector("[data-task-id='" + id + "']");
    let dropZoneEl = event.target.closest(".task-list");
    let statusType = dropZoneEl.id;
    let statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    } else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    } else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.appendChild(draggableElement);
};

// Adds task with button click or when enter key is pressed
formEl.addEventListener("submit", taskFormHandler);
// Listens for clicks on section elements (buttons, dropdowns. etc.)
pageContentEl.addEventListener("click", taskButtonHandler);
// Changes columns based on dropdown delection
pageContentEl.addEventListener("change", taskStatusChangeHandler);
// 
pageContentEl.addEventListener("dragstart", dragTaskHandler);
//
pageContentEl.addEventListener("dragover", dropZoneDragHandler);

pageContentEl.addEventListener("drop", dropTaskHandler);