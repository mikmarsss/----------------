const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const LessonChapterDto = require('../dtos/LessonChapter-dto')
const { Lesson_Chapter } = require('../models/user-model')


class LessonChapterService {
    async createChapter(lessonId, lessonNumber) {
        const time = Math.floor(Date.now() / 100)
        let firstChapter = await Lesson_Chapter.findOne({ where: { course_lesson_id: lessonId } })
        if (!firstChapter) {
            const firstChapter = await Lesson_Chapter.create({ number: 1, name: 'Новый Раздел', content: 'Контент', numberLesson: lessonNumber, created_at: time, updated_at: time, imgs: 'Картинки', course_lesson_id: lessonId })
            const chapterDto = new LessonChapterDto(firstChapter)
            return { chapter: { chapterDto } }
        }
        const predchapter = await Lesson_Chapter.findOne({ where: { course_lesson_id: lessonId }, order: [['created_at', 'DESC']] })
        const index = predchapter.number + 1
        const newChapter = await Lesson_Chapter.create({ number: index, name: 'Новый Раздел', content: 'Контент', numberLesson: lessonNumber, course_lesson_id: lessonId, created_at: time, updated_at: time, imgs: 'Картинки' })
        const chapterDto = new LessonChapterDto(newChapter)
        return { chapter: { chapterDto } }
    }
}

module.exports = new LessonChapterService()