#! /usr/bin/env node
import inquirer from "inquirer";
//defne student class
class Student {
    constructor(name) {
        //using this for any student properties
        this.id = Student.counter++; //increment for 1+ unique id for student
        this.name = name; //names for each student
        this.courses = []; // initialize an empty array for courses
        this.balance = 500;
    }
    //method toEnroll student in a course
    enrollCourse(course) {
        this.courses.push(course);
    }
    //method to view a student balance
    viewBalance() {
        console.log(`Balance for ${this.name} : ${this.balance}`);
    }
    //method to pay student fees
    payFees(amount) {
        this.balance -= amount;
        console.log(`${amount} Fees paid successfully for ${this.name}`);
        console.log(`${this.name} Remaining Balance ${this.balance}`);
    }
    //method to display student status
    showStatus() {
        console.log(`Student Name: ${this.name}`);
        console.log(`Student ID: ${this.id}`);
        console.log(`Student Courses: ${this.courses}`);
        console.log(`Student Balance: ${this.balance}`);
    }
}
Student.counter = 15000;
;
//defne student manager class to manage students
class studentManager {
    constructor() {
        this.students = [];
    }
    //method to add a new students
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`student: ${name} added successfully. Student ID: ${student.id}`);
    }
    ;
    //method to enroll a student in a course
    enrollStudent(studentId, course) {
        let student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    //method to view a student balance
    viewStudentBalance(studentId) {
        let Student = this.findStudent(studentId);
        if (Student) {
            Student.viewBalance();
        }
        else {
            console.log("student not found. Please enter a correct student ID");
        }
        ;
    }
    ;
    //method to pay student fees
    payStudentFees(studentId, amount) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log("student not found. Please enter a correct student ID");
        }
    }
    ;
    //method to display student status
    showStudentStatus(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        }
    }
    ;
    //method to find a student by student id
    findStudent(studentId) {
        return this.students.find(std => std.id === studentId);
    }
}
;
//main function to run the program
async function main() {
    console.log("Welcome to Student Management System by Maham");
    console.log("-".repeat(50));
    let student_manager = new studentManager();
    //while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        //using switch case statement to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter Student Name"
                    }
                ]);
                student_manager.addStudent(nameInput.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter Student ID"
                    }
                ]);
                let course = await inquirer.prompt([
                    {
                        name: "course",
                        type: "input",
                        message: "Enter Course Name"
                    }
                ]);
                student_manager.enrollStudent(courseInput.studentId, courseInput.course);
                break;
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter Student ID"
                    }
                ]);
                student_manager.viewStudentBalance(balanceInput.studentId);
                break;
            case "Pay Student Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter Student ID"
                    }
                ]);
                let amount = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter a student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount to pay"
                    }
                ]);
                student_manager.payStudentFees(feesInput.studentId, feesInput.amount);
                break;
            case "Show Student Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter Student ID"
                    }
                ]);
                student_manager.showStudentStatus(statusInput.studentId);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
//calling a main function
main();
