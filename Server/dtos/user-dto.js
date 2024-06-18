module.exports = class UserDto {
    email;
    id;
    isActivated;
    name;
    surname;
    city;
    dob;
    username;
    changeCode;
    aboutMe;
    img;
    test_result;
    user_done_courses;
    user_done_lessons;
    user_done_tasks;
    role;
    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.surname = model.surname;
        this.city = model.city;
        this.dob = model.dob;
        this.username = model.username;
        this.changeCode = model.changeCode
        this.aboutMe = model.aboutMe
        this.img = model.img
        this.test_result = model.test_result
        this.user_done_courses = model.user_done_courses
        this.user_done_lessons = model.user_done_lessons
        this.user_done_tasks = model.user_done_tasks
        this.role = model.role
    }
}