# ToDo App

Welcome to the **ToDo App**, a command-line interface (CLI) based application for managing your tasks. This app allows you to create, list, complete, view, and delete tasks seamlessly. The tasks are stored locally in a `tasks.json` file for persistence, so your tasks will be saved across sessions.

## Features

- **Create Task**: Add new tasks with custom names.
- **List Tasks**: View all tasks and mark them as completed.
- **Completed Tasks**: View tasks that have been marked as completed.
- **Pending Tasks**: View tasks that are still pending.
- **Delete Tasks**: Remove tasks from the list.
- **Task Persistence**: Tasks are saved in a `tasks.json` file for future use.

## Prerequisites

- **Node.js**: You need Node.js installed on your machine to run this application.
- **npm**: Node Package Manager to install dependencies.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app

2. Install the necessary dependencies:

 ```bash
npm install

3. Make sure to have tasks.json in the root directory of your project. If not, create an empty file:
   ```bash
   echo "[]" > tasks.json

## Running the Application

1. Start the application:
   ```bash
   node app.js

2. You will see the following menu:
 ```bash
Menu >
1) Create task
2) List tasks
3) Completed tasks
4) Pending tasks
5) Delete tasks
6) Exit

- **Create Task**: Input the name of your new task.
- **List Tasks**: Shows the list of tasks where you can mark/unmark tasks as completed.
- **Completed Tasks**: View tasks you’ve already marked as finished.
- **Pending Tasks**: View tasks that are yet to be completed.
- **Delete Tasks**: Select tasks to be deleted.
- **Exit**: Exit the application.

3. Make sure to have tasks.json in the root directory of your project. If not, create an empty file:
   ```bash
   echo "[]" > tasks.json

## Dependencies
- @inquirer/prompts: To handle user input and prompt menus.
- fs.promises: For handling file system operations (reading/writing tasks.json).
