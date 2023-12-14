module.exports = class UserDto {
    email;
    id;
    isActivated;
    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.surname = model.surname;
        this.city = model.city;
        this.dob = model.dob;
    }
}