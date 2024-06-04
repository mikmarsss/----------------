module.exports = class UserTrainersDto {
    id;
    user_id;
    done_trainers;
    status;
    points;
    status_value;

    constructor(model) {
        this.id = model.id;
        this.user_id = model.user_id;
        this.done_trainers = model.done_trainers;
        this.points = model.points;
    }
    setStatus(newStatus) {
        this.status = newStatus;
    }
    setStatusValue(newStatusValue) {
        this.status_value = newStatusValue;
    }
}