module.exports = class ModuleDto {
    id;
    name;
    number;
    description;
    course_info_id;
    done_modules;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.number = model.number;
        this.description = model.description;
        this.course_info_id = model.course_info_id;
        this.done_modules = model.done_modules;

    }
}