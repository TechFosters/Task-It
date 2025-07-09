//all dom related interactions

import { addTaskService, deleteTaskService, getTasksService, loadTaskFromLocal, saveTasksToLocal, searchTaskService, sortTasksService, updateTaskService } from "../services/service.js";
import Task from "../model/model.js";

let isEditMode = false;
let editTaskId = null;


//1 
window.addEventListener('load', init);

//2
function init() {
    loadTaskFromLocal();
    renderTasks();
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

    //11 user can't select a past date
    const dueDateObj = new Date(dueDate);
    const today = new Date();

    today.setHours(0,0,0,0)

    if(dueDateObj < today){
        alert("Please enter a due date that is today or in future")
        return
    }

    //10

    if(isEditMode){
        const updatedTask = new Task(editTaskId, title, description, dueDate, 'pending', priority);
        updateTaskService(updatedTask)

        //once updated reset the editMode to false and editTaskId to null and submit button text to Add Task
        isEditMode = false;
        editTaskId = null;
        document.querySelector('button[type="submit"]').innerText = "Add Task";

    } else{
        //3.3 create new task object

    const task = new Task(Date.now().toString(), title, description, dueDate, 'pending', priority)
    console.log("Inside controller -> task created", task)

    //3.4 send the task created above to service.js to store in an array

    addTaskService(task);
    
    }

    

    //3.5 
    renderTasks()

    //3.6 Clear the form
    document.getElementById('taskForm').reset();
}

//5 function to render tasks in the DOM

function renderTasks(taskArray = getTasksService()) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '' //clear previous cards

   // const tasks = getTasksService(); //this will return task array

    //rendering each task in card format
    taskArray.map((task) => {

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
            </button>
             <button class="btn btn-sm btn-warning mt-2 edit-btn" data-id="${task.id}">
            Edit
            </button>` //6, 8

        taskList.appendChild(card)


    })


    //7. delete buttons

    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            deleteTaskService(id) // 7.1 send this id to task service to get the task deleted
            renderTasks();
        })
    })


    //9. editButtons

    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach((btn)=>{
        btn.addEventListener('click', function(){
            const id = this.getAttribute('data-id');
            const taskToEdit = getTasksService().find(task => task.id === id); //returns object with matching id

            if(taskToEdit){
                document.getElementById('title').value = taskToEdit.title;
                document.getElementById('description').value = taskToEdit.description;
                document.getElementById('date').value = taskToEdit.dueDate;
                document.getElementById('priority').value = taskToEdit.priority;

                isEditMode = true;
                editTaskId = taskToEdit.id;
        
                document.querySelector('button[type="submit"]').innerText = "Update Task";
            }
     
        })

        


    })

    //10.
    document.getElementById('sortBy').addEventListener('change', function(){
        console.log(this)
        const sortKey = this.value  //this refers to dropdown field
        sortTasksService(sortKey);
        renderTasks()
    })

    //11.
    document.getElementById('search').addEventListener('input', function(){
        console.log("this", this.value)
        const keyword = this.value.trim().toLowerCase();
        const filteredTasks = searchTaskService(keyword)
        renderTasks(filteredTasks)
    })

    console.log('Inside controller -> renderTask', taskArray)
}

