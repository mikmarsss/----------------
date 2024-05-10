module.exports = class LessonDto {
    id;
    name;
    number;
    content;
    numberModule;
    course_module_id;
    done_lessons;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.number = model.number;
        this.numberModule = model.numberModule;
        this.content = model.content;
        this.course_module_id = model.course_module_id;
        this.done_lessons = model.done_lessons;
    }
}