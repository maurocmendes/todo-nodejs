//Criando o modelo de tarefas
let task = {
    value: 'Test',
    id: 0,
    checked: false
}

let tasks = [ task ]


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
        const answers = await checkbox({
            message: "Complete tasks marking with space, press enter to confirm and back",
            choices: [...tasks]
        })

         tasks.forEach((m) => {
            m.checked = false
        })

        if(answers === 0){
            console.log("Select at least one task")

        }
        answers.forEach((answer) => {
            const task = tasks.find((m) =>{
                return m.value === answer
            })
            task.checked = true
        })

        console.log("The selected task are now marked as finished")
}

//Criando função para listar tarefas concluídas
const completedTasks = async () => {
    const completed = tasks.filter((task) => {
        return task.checked
    })
    if(completed.length === 0){
       console.log("There is no completed tasks (◡︵◡)")
        return
    }
    await select({
        message: "Completed tasks ( ͡° ͜ʖ ͡°)_/¯ :\n",
        choices: [...completed]
    })
}

//Criando função para listar tarefas pendentes
const pendingTasks = async () => {
    const pending = tasks.filter((task) => {
        return task.checked !== true
    })
    if(pending.length === 0){
        console.log("There is no pending tasks! =D " )
        return
    }
    await select({
        message: "Pending tasks : " + pending.length,
        choices: [...pending]

    })
}

//Criando função para apagar tarefas
const deleteTasks = async  () =>{
    let task
}

// Criando função para iniciar a aplicação
const { select, input, checkbox} = require('@inquirer/prompts')
 const start = async () => {
     while (true) {
         const option = await select({
             message: '\nTo Do Application \n Menu >',
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

start();

