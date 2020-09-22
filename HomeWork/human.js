function Human(obj) {
    this.name = obj.name;
    this.surname = obj.surname;
    this.age = obj.age;
};

function Teacher(obj) {
    Human.call(this, obj);
    this.group = obj.group || [];

    this.setMarkByStudentName = function(mark, name) {
        this.group.find( (item) => item.name === name ? item.mark.push(mark) : false );
    }
};

function Student(obj) {
    Human.call(this, obj);
    this.mark = obj.mark;

    let setSpecialization = function() {
        let specialization = obj.specialization;
        return function(newSpec) {
            specialization = newSpec;
        }
    };

    this.setSpecialization = setSpecialization();
};

Human.prototype = Object.assign(Human.prototype, {
    getFullName() {
        return `${this.name} ${this.surname}`;
    },
    setFullName(fullName) {
        fullName = fullName.split(' ');
        this.name = fullName[0];
        this.surname = fullName[1];
    }
});

// Set a prototype inheritance
Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;

Teacher.prototype = Object.create(Human.prototype);
Teacher.prototype.constructor = Teacher;


Teacher.prototype = Object.assign(Teacher.prototype, {
    getListOfNamesByAverageMark() {
        return this.group.sort((a, b) => b.averageMark() - a.averageMark())
        .map( (item) => item.name );
    },
    getStudentByName(name) {
        return this.group.find( (item) => item.name === name);
    },
    removeStudentByName(name) {
        this.group.splice(this.group.indexOf(this.getStudentByName(name)), 1);
    },
    updateStudentByName(student, name) {
        this.group.splice(this.group.indexOf(this.getStudentByName(name)), 1, new Student(student));
    },
});

Student.prototype = Object.assign(Student.prototype, {
    averageMark() {
        return Math.round(this.mark.reduce( (acc, item) => acc += item, 0) / this.mark.length);
    },
    minMark() {
        return this.mark.sort( (a, b) => b - a )[mark.length - 1];
    },
    maxMark() {
        return this.mark.sort( (a, b) => a - b )[mark.length - 1];
    },
    getFullName() {
        return Human.prototype.getFullName.call(this) + ' - student';
    }
});

let human = new Human({
    name: 'John',
    surname: 'Seliber',
    age: 19,
});

let student = new Student({
    name: 'Bob',
    surname: 'Millester',
    age: 20,
    mark: [10, 2, 7, 9, 5, 1],
    specialization: 'Programmer'
});

let teacher = new Teacher({
    name: 'Maxim',
    surname: 'Older',
    age: 29,
    group: [
        new Student({
            name: 'Andrew',
            surname: 'Wilson',
            age: 18,
            mark: [5, 2, 3, 10, 7, 1]
        }), new Student({
            name: 'Ella',
            surname: 'Thomas',
            age: 17,
            mark: [5, 1, 3, 10, 2, 10]
        }), new Student({
            name: 'Eleanor',
            surname: 'Walker',
            age: 19,
            mark: [5, 7, 5, 9, 8, 10]
        }), new Student({
            name: 'Maxim',
            surname: 'Johnson',
            age: 18,
            mark: [5, 8, 7, 3, 7, 10]
        }), new Student({
            name: 'John',
            surname: 'Brown',
            age: 20,
            mark: [5, 4, 6, 10, 7, 10]
        })
    ]
});

