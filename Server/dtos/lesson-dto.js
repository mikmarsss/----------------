module.exports = class LessonDto {
    id;
    name;
    number;
    img;
    content;
    material;
    numberModule;
    course_module_id;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.number = model.number;
        this.content = model.content;
        this.img = model.img;
        this.course_module_id = model.course_module_id;
    }
}