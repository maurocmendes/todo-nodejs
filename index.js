const { select, input, checkbox} = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Welcome to your ToDo App";

let tasks

const loadTasks = async () => {
    try {
        const data = await fs.readFile("tasks.json", "utf-8")
        tasks = JSON.parse(data)
    }
    catch (error) {
        tasks = []
    }
}

const saveTasks = async () => {
    await fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2))
}


//Criando função para criar tarefa
let nextTaskId = 1;
const createTask = async () => {
    const task = await input({ message: "Type the name of your task:"})
    if(task.length === 0){
        console.log("Task name cannot be empty")
        return
    }
    const taskId = nextTaskId++;
    tasks.push({ value: task, id: taskId, checked: false })
}

//Criando função para listar tarefas/marcar e desmarcar
const listTasks = async () => {
        if (tasks.length === 0) {
        mensagem = "No tasks to list!"
        return
        }
        const answers = await checkbox({
            message: "Complete tasks marking with space, press enter to confirm and return",
            choices: [...tasks],
            instructions: false,
        })
         tasks.forEach((m) => {
            m.checked = false
        })
        if(answers.length === 0){
            mensagem= "Select at least one task"
            return
        }
        answers.forEach((answer) => {
            const task = tasks.find((m) =>{
                return m.value === answer
            })

            task.checked = true
        })
        mensagem = "The selected task are now marked as finished"
}

//Criando função para listar tarefas concluídas
const completedTasks = async () => {
    const completed = tasks.filter((task) => {
        return task.checked
    })
    if(completed.length === 0){
       mensagem = "There is no completed tasks (◡︵◡)"
        return
    }
    await select({
        message: "Completed tasks :" + completed.length,
        choices: [...completed]
    })
}

//Criando função para listar tarefas pendentes
const pendingTasks = async () => {
    const pending = tasks.filter((task) => {
        return task.checked !== true
    })
    if(pending.length === 0){
        mensagem = "There is no pending tasks! =D "
        return
    }
    await select({
        message: "Pending tasks : " + pending.length,
        choices: [...pending]

    })
}

//Criando função para apagar tarefas
const deleteTasks = async () => {
    if(tasks.length === 0) {
        mensagem = "No tasks available to delete!"
        return
    }
    const tasksUnmarked = tasks.map((task) => {
        return { value: task.value, id: task.id, checked: false }
    })
    const selectedToDelete = await checkbox({
        message: "Select with 'space' tasks to delete, then press 'enter' to confirm",
        choices: [...tasksUnmarked],
        instructions: false,
    })
    if (selectedToDelete.length === 0){
        mensagem = "There is no tasks to delete"
        return
    }
    selectedToDelete.forEach((item) => {
        tasks = tasks.filter((task) => {
        return task.value !== item
        })
    })
    mensagem = selectedToDelete.length + " task(s) deleted successfully "
}

const showMessage = () => {
    console.clear();

    if (mensagem !== "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}


// Criando função para iniciar a aplicação
const start = async () => {
    await loadTasks()

    while (true) {
        showMessage()
        await saveTasks()

         const option = await select({
             message: 'Menu >',
             choices:[
                 {
                     name:"Create task",
                     value:"create"
                 },
                 {
                     name:"List tasks",
                     value:"list"
                 },
                 {
                     name:"Completed tasks",
                     value:"completed"
                 },
                 {
                     name:"Pending tasks",
                     value:"pending"
                 },
                 {
                     name:"Delete tasks",
                     value:"delete"
                 },
                 {
                     name:"Exit",
                     value:"exit"
                 }
             ]
         })
            switch (option) {
                case "create":
                    await createTask()
                    console.log(tasks)
                    break
                case "list":
                    await listTasks()
                    console.log(tasks)
                    break
                case "completed":
                    await completedTasks()
                    break
                case "pending":
                    await pendingTasks()
                    break
                case "delete":
                    await deleteTasks()
                    break
                case "exit":
                    console.log("See you next time!")
                    return
            }

     }

 }

start()

