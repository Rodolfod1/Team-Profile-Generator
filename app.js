const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const util = require("util");
const fs = require("fs");

// promisify file writing and directory creator 
const mkdirAsync=util.promisify(fs.mkdir);
const writeFileAsync=util.promisify(fs.writeFile);


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const Choices = require("inquirer/lib/objects/choices");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// declaring my questions for inquirer
const GenQs = [
    {   type:"list",
                message:"Select Role",
                name:"role",
                choices:[
                    "Manager",
                    "Engineer",
                    "Intern"
                    ]
            },
    { message:"Provide the Name: ",
        name:"name",
    },
    { message:"Please Provide the e-mail: ",
      name:"email",
    },
    { message:"Please Provide employee id#: ",
      name:"id",
    },
];
// specific questions according Roles
const MgrQ=[{message:"Please provide the Office Number: ", name:"officeNumber"}];
const EngQ=[{message:"Please provide a Github username: ", name:"gitHub"}];
const IntQ=[{message:"Please provide the School Name: ", name:"school"}];
// question for asking if there are more employees to add
const askContinue= [{ type:"confirm", message:" Do you want to continue adding employees?  ", name:"confirmation"}];
// Calling an Async function ass my main function                      
const start = async () =>{
    const employees=[];
    let again=true;
    // Looping the questions with a while 
    while (again){
        // extacting values from the inquirer array using destructuring for general questions 
        const {role, name, email, id} = await inquirer.prompt(GenQs);       
        // HINT: each employee type (manager, engineer, or intern) has slightly different
        // information; write your code to ask different questions via inquirer depending on
        // employee type.
        //check if the role is manager 
        if (role === 'Manager'){
            const {officeNumber} = await inquirer.prompt(MgrQ);
            // pushing to the array creating a new member 
            employees.push(new Manager(name, id, email,  officeNumber));
        } else if (role === 'Engineer'){
            const {gitHub} = await inquirer.prompt(EngQ);
            // pushing to the array creating a new member 
            employees.push(new Engineer(name, id, email, gitHub));
        } else { 
            const {school} = await inquirer.prompt(IntQ);
            // pushing to the array creating a new member 
            employees.push(new Intern(name, id, email, school));
        } 
        // remainder-- use the same name property content from the inquirer for destructuring 
        const {confirmation}= await inquirer.prompt(askContinue);
        again=confirmation;       
    }
 
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
    const html= render(employees);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
    //checking if my output folder exists
    if (!fs.existsSync(outputPath)) {
        const error = await mkdirAsync(OUTPUT_DIR);
        error && console.error(error);
    }
  const error = await writeFileAsync(outputPath, html);
  error && console.error(error);
};

start();




// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
