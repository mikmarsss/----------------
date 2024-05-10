module.exports = class LessonChapterDto {
    id;
    name;
    number;
    content;
    numberLesson;
    course_lesson_id;
    imgs;
    created_at;
    updated_at;
    done_chapters;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.number = model.number;
        this.numberLesson = model.numberLesson;
        this.content = model.content;
        this.created_at = model.created_at;
        this.updated_at = model.updated_at;
        this.course_lesson_id = model.course_lesson_id;
        this.imgs = model.imgs;
        this.done_chapters = model.done_chapters;
    }
}