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
    }
}