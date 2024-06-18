module.exports = class DoneTrainersDTO {
    id;
    user_id;
    trainer_id;
    code;
    isDone;
    check;
    constructor(model) {
        this.id = model.id
        this.user_id = model.id
        this.trainer_id = model.trainer_id
        this.code = model.code
        this.isDone = model.isDone
        this.check = model.check

    }
}