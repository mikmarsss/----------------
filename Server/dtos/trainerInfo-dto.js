module.exports = class TrainerInfoDTO {
    id;
    name;
    content;
    user_id;
    programming_languages;
    dificult;
    code;
    tests;
    status;
    points;
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.content = model.content
        this.user_id = model.user_id
        this.programming_languages = model.programming_languages
        this.dificult = model.dificult
        this.code = model.code
        this.tests = model.tests
        this.status = model.status
        this.points = model.points
    }
}