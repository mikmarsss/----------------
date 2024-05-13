module.exports = class CourseDto {
    id;
    name;
    description;
    courseContent;
    price;
    newPrice;
    rating;
    people;
    time;
    img;
    type;
    additional_type;
    created_at;
    updated_at;
    status;
    amount_done_courses;
    amount_done_modules;
    amount_done_lessons;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.courseContent = model.courseContent;
        this.price = model.price;
        this.new_price = model.new_price;
        this.rating = model.rating;
        this.people = model.people;
        this.time = model.time;
        this.img = model.img
        this.type = model.type
        this.additional_type = model.additional_type
        this.created_at = model.created_at
        this.updated_at = model.updated_at
        this.status = model.status
        this.amount_done_courses = model.amount_done_courses
        this.amount_done_modules = model.amount_done_modules
        this.amount_done_lessons = model.amount_done_lessons
    }
}