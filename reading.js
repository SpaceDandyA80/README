const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter your GitHub Username",
            name: "username"
        },
        {
            type: "input",
            message: "enter repo name",
            name: "reponame"
        },
        {
            type: "input",
            message: "Description",
            name: "desc"
        },
        {
            type: "input",
            message: "Table Content",
            name: "tablecontent"
        },
        {
            type: "input",
            message: "Installation Process",
            name: "install"
        },
        {
            type: "input",
            message: "Usage",
            name: "usage"
        },
        {
            type: "input",
            message: "License",
            name: "license"
        },
        {
            type: "input",
            message: "Contributers",
            name: "contribute"
        },
        {
            type: "input",
            message: "Tests",
            name: "test"
        },
        {
            type: "input",
            message: "Questions",
            name: "quest"
        },

    ]);
}

// User GitHub email
function generateREADME(answers, responseObject) {
    return `
  # ${answers.username} 
  ## Project Title
  * ${answers.reponame}
  ## New Description
  * ${answers.desc}
  ## Original Description ' ${responseObject.data.description} '
  ## Table Content
  * ${answers.tablecontent}
  ## Installation
  * ${answers.install}
  ## Usage
  * ${answers.usage}
  ## New License
  * ${answers.license}
  ## Original License
  * ${responseObject.data.license} 
  ## Contributers
  * ${answers.contribute}
  ## Tests 
  * ${answers.test}
  ## Questions
  * ${answers.quest}

  ## Github Profile Avatar
  ![alt text]( ${responseObject.data.owner.avatar_url} "Logo Title Text 1")
  ## Created At ${responseObject.data.created_at}
  # Origination ' ${responseObject.data.default_branch} branch'
  
`;
}

promptUser()
    .then(function (answers) {
        const queryUrl = `https://api.github.com/repos/${answers.username}/${answers.reponame}`;
        //console.log(queryUrl)
        axios.get(queryUrl)
            .then(function (res) {
                const read = generateREADME(answers, res);
                //console.log(res);
                return writeFileAsync("README.md", read);
            })
    })

    .then(function () {
        console.log("Successfully wrote to README.md");
    })
    .catch(function (err) {
        console.log(err);
    });

