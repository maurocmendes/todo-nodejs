//Criando o modelo de tarefas
let task = {
    value: '',
    checked: false
}

let tasks = [ task ]


//Criando função para criar tarefa

const createTask = async () => {
    const task = await input({ message: "Type the name of your task:"})
    if(task.length === 0){
        console.log("Task name cannot be empty")
        return
    }

    tasks.push({ value: task, checked: false })
}


// Criando função para iniciar a aplicação

const { select, input    } = require('@inquirer/prompts')

 const start = async () => {
     while (true) {

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
                    listTasks()
                    break
                case "delete":
                    deleteTask()
                    break
                case "exit":
                    console.log("See you next time!")
                    return
            }

     }

 }

start();

