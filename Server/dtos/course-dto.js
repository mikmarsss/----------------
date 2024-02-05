module.exports = class CourseDto {
    id;
    name;
    description;
    courseContent;
    price;
    rating;
    people;
    time;
    img;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.courseContent = model.courseContent;
        this.price = model.price;
        this.rating = model.rating;
        this.people = model.people;
        this.time = model.time;
        this.img = model.img
    }
}