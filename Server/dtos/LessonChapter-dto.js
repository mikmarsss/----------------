module.exports = class LessonChapterDto {
    id;
    name;
    number;
    content;
    numberLesson;
    course_lesson_id;
    imgs;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.number = model.number;
        this.numberLesson = model.numberLesson;
        this.content = model.content;
        this.course_lesson_id = model.course_lesson_id;
        this.imgs = model.imgs;
    }
}