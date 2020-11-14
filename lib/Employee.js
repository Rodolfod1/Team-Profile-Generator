// TODO: Write code to define and export the Employee class
class Employee {
    // Setting up the constructor for this class 
      // Setting up the constructor for this class 
      constructor (name, email, id, github){
        this.name = name;
        this.email = "test@test.com";
        this.id = 100; 
        this.github = github;
    }

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email;
    }
    getId(){
        return this.id;
    }
  
    getRole() {
        return 'Employee';
    }
}



module.exports = Employee;