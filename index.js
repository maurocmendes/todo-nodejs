


// Criando função para iniciar a aplicação

const { select } = require('@inquirer/prompts')

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
                 }
             ]
         })
            switch (option) {
                case "create":
                    createTask()
                    break
                case "list":
                    listTasks()
                    break
                case "delete":
                    deleteTask()
                    break
            }
     }

 }

start();

