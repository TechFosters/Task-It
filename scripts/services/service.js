//logic goes here

//4
let tasks = [];

export function addTaskService(task) {
    console.log("Inside service  -> Adding task to memory array", task)
    tasks.push(task)
}

export function getTasksService() {
    console.log('Inside Service -> getTasksService called -> all tasks', tasks)
    return tasks;
}