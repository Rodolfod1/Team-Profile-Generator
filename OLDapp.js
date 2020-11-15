const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const util = require("util");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const Choices = require("inquirer/lib/objects/choices");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees=[];
var again=true;

// function askQs(){
    
    inquirer.prompt([
        {   type:"checkbox",
            message:"Select Role",
            Choices:[
                "Manager",
                "Engineer",
                "Intern"
            ]
    },
    {
        // type:"input",
        message:"Provide the Name: ",
        name:"name",
    },
    {
        // type:"input",
        message:"Please Provide the e-mail: ",
        name:"email",
    },
    {
        // type:"input",
        message:"Please Provide employee id#: ",
        name:"id",
    },
    ]).then(answer => {
        // check for the role and create objects accordingly 
         if (answer.Choices === "Manager") {
                inquirer.prompt([
                    {
                        type:"input",
                        message:"Please provide the Office Number: ",
                        name:"officeNumber"
                    }
                ]).then(val =>{
                    /// creates an object with all variables and push it to employees 
                    employees.push(new Manager(answer.name,answer.id,answer.email,val.officeNumber));
                })

            }else if (answer.Choices=== "Engineer" ){
                inquirer.prompt([
                    {
                        type:"input",
                        message:"Please provide a Github username: ",
                        name:"gitHub"
                    }
                ]).then(val =>{
                    /// creates an object with all variables and push it to employees 
                    employees.push(new Engineer(answer.name,answer.id,answer.email,val.gitHub));
                })

            }else {
                inquirer.prompt([
                    {
                        type:"input",
                        message:"Please provide the School Name: ",
                        name:"school"
                    }
                ]).then(val =>{
                    /// creates an object with all variables and push it to employees 
                    employees.push(new Intern(answer.name,answer.id,answer.email,val.school));
                })


            };
    })
// }








// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
 const html= render(employees);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// async function init() {
//     console.log("Welcome to my Team Profile Generator!");
//     try{
//         askQs();
//         const html= render(employees);
//         // await writeFileAsync(outputPath,html);
//         console.log("Success writing to html !!");
//     } catch(err){
//         console.log(err);
//     }
// }
// init();




//  if (!fs.existsSync(outputPath)) {
//      const error = mkdirAsync(OUTPUT_DIR);
//     //  const error = await mkdirAsync(OUTPUT_DIR);
//      error && console.error(error);
//    }

//    const error = writeFileAsync(outputPath, html);
// //    const error = await writeFileAsync(outputPath, html);
//    error && console.error(error);

 askQs();




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
