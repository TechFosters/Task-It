//all dom related interactions

import { addTaskService, deleteTaskService, getTasksService } from "../services/service.js";
import Task from "../model/model.js";

//1 
window.addEventListener('load', init);

//2
function init() {

    const form = document.getElementById('taskForm')
    form.addEventListener('submit', handleAddTask);
}

//3
function handleAddTask(event) {
    event.preventDefault();

    //3.1 Get form input values

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const dueDate = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;

    //3.2 Basic validation

    if (!title || !description || !dueDate || !priority) {
        alert("All fields are required");
        return;
    }

    //3.3 create new task object

    const task = new Task(Date.now().toString(), title, description, dueDate, 'pending', priority)
    console.log("Inside controller -> task created", task)

    //3.4 send the task created above to service.js to store in an array

    addTaskService(task);

    //3.5 
    renderTasks()

    //3.6 Clear the form
    document.getElementById('taskForm').reset();
}

//5 function to render tasks in the DOM

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '' //clear previous cards

    const tasks = getTasksService(); //this will return task array

    //rendering each task in card format
    tasks.map((task) => {

        const card = document.createElement('div')
        card.classList = 'card mb-3 p-3';

        card.innerHTML =
            `<h5>${task.title}</h5>
            <p>${task.description}</p>
            <p><strong>Due:</strong> ${task.dueDate}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <span class="badge bg-warning text-dark">${task.status}</span>

            <button class="btn btn-sm btn-danger mt-2 delete-btn" data-id="${task.id}">
            Delete
            </button>` //6

        taskList.appendChild(card)


    })


    //7. delete buttons

    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', function(){
            const id = this.getAttribute('data-id');
            deleteTaskService(id) // 7.1 send this id to task service to get the task deleted
            renderTasks();
        })
    })
    console.log('Inside controller -> renderTask', tasks)
}

