exports.studentInfo = class Student {
    constructor(name, age, email, password){
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }
    
    getStudentInfo(){
        console.log(JSON.stringify(this));
    }
}

