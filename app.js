const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const util = require("util");
const fs = require("fs");

// promisify file writing and directory creator 
const writeFileAsync=util.promisify(fs.writeFile);
const mkdirAsync=util.promisify(fs.mkdir)

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const Choices = require("inquirer/lib/objects/choices");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const start = async () =>{
    const employees=[];
    var again=true;
    const GenQs=[
                {   type:"checkbox",
                            message:"Select Role",
                            name:"role",
                            Choices:[
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
            ]
            // specific questions according Roles
    const MgrQ=[{message:"Please provide the Office Number: ", name:"officeNumber"}];
    const EngQ=[{message:"Please provide a Github username: ", name:"gitHub"}];
    const IntQ=[{message:"Please provide the School Name: ", name:"school"}];
    // Looping the questions with a while 
    while (again){
        // creating the object 
        const {role, name, email, id} = await inquirer.prompt(GenQs);
        if (role === Manager){
            const {officeNumber} = await inquirer.prompt(MgrQ);
            // pushing to the array creating a new member 
            employees.push(new Manager(name, email, id, officeNumber));
        } else if (role === Engineer){
            const {gitHub} = await inquirer.prompt(EngQ);
            // pushing to the array creating a new member 
            employees.push(new Engineer(name, email, id, gitHub));
        } else { 
            const {school} = await inquirer.prompt(IntQ);
            // pushing to the array creating a new member 
            employees.push(new Intern(name, email, id, school));
        }

        const askContinue= [{ type:"confirm", message:" Do you want to continue adding employees?  ", name:"confirmation"}]
        const {valueCont}= await inquirer.prompt(askContinue);
        again=valueCont;
        console.log(again);
    }
 
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
    const html= render(employees);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
if (!fs.existsSync(outputPath)) {
    const error = await mkdirAsync(OUTPUT_DIR);
    error && console.error(error);
  }

  const error = await writeFileAsync(outputPath, html);
  error && console.error(error);
};

start();





// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
