#! usr/bin/env node
import inquirer from "inquirer";
let todoList = [];
// function to add item in list
let addIt = async () => {
    let userInput = await inquirer.prompt([
        {
            name: "itemAdd",
            type: "input",
            message: "Add something in your TODO: "
        }
    ]);
    todoList.push(userInput.itemAdd);
    terminate("added");
};
let viewIt = () => {
    console.log(todoList);
    terminate("");
};
let updateIt = async () => {
    let update = await inquirer.prompt([
        {
            name: "option",
            message: "Update by: ",
            type: "list",
            choices: ["Index", "Value"]
        }
    ]);
    switch (update.option) {
        case "Index":
            let updateIndex = await inquirer.prompt([
                {
                    name: "index",
                    message: "Enter index",
                    type: "input",
                },
                {
                    name: "value",
                    message: "Enter your value",
                    type: "input",
                }
            ]);
            todoList[updateIndex.index] = updateIndex.value;
            terminate("updated");
            break;
        case "Value":
            let value = await inquirer.prompt([
                {
                    name: "valueOld",
                    message: "Enter old value: ",
                    type: "input",
                },
                {
                    name: "valueNew",
                    message: "Enter updated value: ",
                    type: "input",
                },
            ]);
            let arr_index = todoList.indexOf(value.valueOld);
            todoList[arr_index] = value.valueNew;
            terminate("updated");
            break;
    }
};
let deleteIt = async () => {
    let toDelete = await inquirer.prompt([
        {
            name: "option",
            message: "Delete By: ",
            type: "list",
            choices: ["Index", "Value"],
        },
    ]);
    switch (toDelete.option) {
        case "Index":
            let deleteIndex = await inquirer.prompt([
                {
                    name: "index",
                    message: "Enter index",
                    type: "input",
                },
            ]);
            todoList.splice(deleteIndex.index, 1);
            terminate("deleted");
            break;
        case "Value":
            let valueToDelete = await inquirer.prompt([
                {
                    name: "value",
                    message: "Enter value to delete: ",
                    type: "input",
                },
            ]);
            let arr_index = todoList.indexOf(valueToDelete.value);
            todoList.splice(arr_index, 1);
            terminate("deleted");
            break;
    }
};
let terminate = async (performedOperation) => {
    if (performedOperation != "") {
        console.log(`Item has been ${performedOperation}`);
    }
    let confirm = await inquirer.prompt([
        {
            name: "continue",
            type: "confirm",
            message: "Do you want to Continue program? ",
            default: true
        }
    ]);
    if (confirm.continue == true) {
        main();
    }
};
let main = async () => {
    let operation = await inquirer.prompt([
        {
            name: "selection",
            message: "Select operation for todo list",
            type: "list",
            choices: ["Add", "View", "Update", "Delete"],
        }
    ]);
    switch (operation.selection) {
        case "Add":
            addIt();
            break;
        case "View":
            viewIt();
            break;
        case "Update":
            updateIt();
            break;
        case "Delete":
            deleteIt();
            break;
    }
};
main();
