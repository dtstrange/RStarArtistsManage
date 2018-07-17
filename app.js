require("dotenv").config();
const inquirer = require("inquirer");
const authCtrl = require("./controller/auth/auth-ctrl.js");

registerUser = () => [
    inquirer.prompt([
        {
            type:'input',
            name: 'email',
            message: 'input an email',
        },
        {
            type: 'input',
            name: 'username',
            message: 'input a username'
        },
        {
            type:'password',
            name:'password',
            message: 'input a password',
            
        }
    ])
    .then(function(answers){
        inqUser = {
            email: answers.email,
            username: answers.username,
            password: answers.password
        }
        
        authCtrl.register(inqUser);
        start();
    })
    
];

updateUserPassword =()=>[
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'input user ID'
        },
        {
            type: 'input',
            name: 'password',
            message: 'enter a new password'
        }
    ])
    .then(function(answers){
        inqUser = {
            id: answers.id,
            password: answers.password
        }

        authCtrl.update(inqUser);
        start();
    })
    
    
];



start = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'intro',
            message: 'What do you want to do?',
            choices:[
                'Register a User',
                'Update a user password'
            ]
        },
        
    ])
    .then(function(answers){
        if(answers.intro === 'Register a User'){
            registerUser();
        }
        else if(answers.intro === 'Update a user password'){
            updateUserPassword();
        }
    });
};

start();