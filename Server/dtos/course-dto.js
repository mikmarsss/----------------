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
    type;
    additional_type;
    created_at;
    updated_at;
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
        this.type = model.type
        this.additional_type = model.additional_type
        this.created_at = model.created_at
        this.updated_at = model.updated_at
    }
}