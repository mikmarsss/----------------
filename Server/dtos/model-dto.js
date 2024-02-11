module.exports = class ModuleDto {
    id;
    name;
    number;
    description;
    course_info_id;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.number = model.number;
        this.description = model.description;
        this.course_info_id = model.course_info_id;
    }
}