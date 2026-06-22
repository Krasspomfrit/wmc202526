

const students = [
  { name: "Anna", age: 17, grade: 2 },
  { name: "Ben", age: 16, grade: 4 },
  { name: "Clara", age: 18, grade: 1 },
  { name: "David", age: 17, grade: 5 },
  { name: "Elena", age: 16, grade: 3 },
  { name: "Felix", age: 19, grade: 2 },
  { name: "Gina", age: 17, grade: 1 },
  { name: "Hugo", age: 18, grade: 4 },
];

//Task 1
const passed = students.filter(student => student.grade <= 4);

console.log(passed);

//Task2
const labels = students.map(student => `${student.name} (${student.age})`);

console.log(labels);

//Task3
const passedNames = students
  .filter(student => student.grade <= 4)
  .map(student => student.name);

console.log(passedNames);

//Task4
const totalGradeSum = students.reduce((sum, student) => sum + student.grade, 0);
const averageGrade = totalGradeSum / students.length;

console.log(averageGrade);

//Task5
const result = students
  .filter(student => student.age >= 17 && student.grade <= 4)
  .map(student => student.name)
  .join(", ");

console.log(result);

