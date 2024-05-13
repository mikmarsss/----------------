module.exports = class YearIncomeStatDto {
    id;
    course_insfo_id;
    January;
    February;
    March;
    April;
    May;
    June;
    July;
    August;
    September;
    October;
    November;
    December;
    constructor(model) {
        this.id = model.id;
        this.course_insfo_id = model.course_insfo_id;
        this.January = model.January;
        this.February = model.February;
        this.March = model.March;
        this.April = model.April;
        this.May = model.May;
        this.June = model.June
        this.July = model.July
        this.August = model.August
        this.September = model.September
        this.October = model.October
        this.November = model.November
        this.December = model.December
    }
}