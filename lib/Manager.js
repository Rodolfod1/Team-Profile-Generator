// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee=require("./Employee")
class Manager extends Employee {
    // Setting up the constructor for this class 
     constructor (name, email, id, officeNumber){
         super(name, email, id)
       this.officeNumber = officeNumber;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole() {
        return 'Manager';
    }
}



module.exports = Manager;