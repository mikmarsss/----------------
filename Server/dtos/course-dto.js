module.exports = class CourseDto {
    id;
    name;
    price;
    rating;
    people;
    time;
    img;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.price = model.price;
        this.rating = model.rating;
        this.people = model.people;
        this.time = model.time;
        this.img = model.img
    }
}