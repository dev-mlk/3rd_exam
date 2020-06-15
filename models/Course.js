exports.courseInfo = class Course {
    constructor(title, duration, instructor){
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }
    
    getStudentInfo(){
        console.log(JSON.stringify(this));
    }
}
