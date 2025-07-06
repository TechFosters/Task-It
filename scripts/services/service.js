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
