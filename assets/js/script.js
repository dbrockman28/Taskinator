let placeholderTask = document.querySelector("#placeholder")
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

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
    // Same but for a <div>
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // Add to DOM
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // Add to page
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
};
// Adds task with button click or when enter key is pressed
formEl.addEventListener("submit", taskFormHandler);