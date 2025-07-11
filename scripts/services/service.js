//logic goes here

import Task from "../model/model.js";

//4
let tasks = [];

//local storage implemnetation


export function saveTasksToLocal(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
    //console.log(localStorage.setItem('tasks', JSON.stringify(tasks)));
}

export function loadTaskFromLocal(){
    const saved = localStorage.getItem('tasks');
    if(saved){
        const parsed = JSON.parse(saved);
        tasks = parsed.map((obj)=> new Task(obj.id, obj.title, obj.description, obj.dueDate, obj.status, obj.priority))
    }
}
export function addTaskService(task) {
    console.log("Inside service  -> Adding task to memory array", task)
    tasks.push(task)
    saveTasksToLocal();
}

export function getTasksService() {
    console.log('Inside Service -> getTasksService called -> all tasks', tasks)
    return tasks;
}

//7.2
export function deleteTaskService(taskId){
    console.log('Inside Service -> Deleting task with ID:', taskId);
    console.log("Deleting task with id", taskId)
    console.log("before Delete", tasks)
    tasks = tasks.filter(task => task.id !== String(taskId))
    console.log('after delete', tasks)

}

export function updateTaskService(updatedTask){
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask: task)
    console.log("Inside Service =>  Task updated:", updatedTask);
}

export function sortTasksService(key){

    if(key === 'priority'){
        const priorityOrder = {high: 1, medium: 2, low: 3}
        tasks.sort((a,b)=> priorityOrder[a.priority] - priorityOrder[b.priority]) //this returns sorted array
    } else if(key === 'dueDate'){
        tasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
    } else if(key === 'title'){
        tasks.sort((a,b) => a.title.localeCompare(b.title));
    }
}

   export function searchTaskService(keyword){
    if(!keyword){
        return tasks;
    }

    const filtered = tasks.filter((task)=> task.title.toLowerCase().startsWith(keyword));
    return filtered;
}

    export function toggleTaskStatusService(id){
        tasks = tasks.map((task)=>{
            if(task.id === id){
                task.status = task.status === 'completed'? 'pending':'completed'
            }
            return task;
        });
        saveTasksToLocal();
    }