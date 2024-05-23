const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const LessonChapterDto = require('../dtos/LessonChapter-dto')
const { Lesson_Chapter, Module_lesson } = require('../models/user-model')


class LessonChapterService {
    async createChapter(course_lesson_id) {
        const time = Math.floor(Date.now() / 100)
        let firstChapter = await Lesson_Chapter.findOne({ where: { course_lesson_id: course_lesson_id } })
        const lesson = await Module_lesson.findOne({ where: { id: course_lesson_id } })
        const lessonNumber = lesson.number
        if (!firstChapter) {

            const firstChapter = await Lesson_Chapter.create({ number: 1, name: 'Новый Раздел', content: 'Контент', numberLesson: lessonNumber, created_at: time, updated_at: time, imgs: 'Картинки', course_lesson_id: course_lesson_id })
            const chapterDto = new LessonChapterDto(firstChapter)
            return { chapter: { chapterDto } }
        }
        const predchapter = await Lesson_Chapter.findOne({ where: { course_lesson_id: course_lesson_id }, order: [['created_at', 'DESC']] })
        const index = predchapter.number + 1
        const newChapter = await Lesson_Chapter.create({ number: index, name: 'Новый Раздел', content: 'Контент', numberLesson: lessonNumber, course_lesson_id: course_lesson_id, created_at: time, updated_at: time, imgs: 'Картинки' })
        const chapterDto = new LessonChapterDto(newChapter)
        return { chapter: chapterDto }
    }

    async fetchChapter(chapter_id) {
        const chapter = await Lesson_Chapter.findOne({ where: { id: chapter_id } })
        const chapterDto = new LessonChapterDto(chapter)
        return { chapter: chapterDto }
    }

    async fetchChapters(course_lesson_id) {
        const chapters = await Lesson_Chapter.findAll({ where: { course_lesson_id: course_lesson_id }, order: [['number', 'ASC']] })
        return { chapters }
    }

    async saveChapter(chapter_id, chapter_info, chapter_name, img, video) {
        const time = Math.floor(Date.now() / 1000)
        const chapter = await Lesson_Chapter.findOne({ where: { id: chapter_id } })
        if (video) {
            let deleteVideo = chapter.video
            if (deleteVideo !== 'video') {
                fs.unlinkSync(path.resolve(__dirname, '..', 'videos', deleteVideo))
            }
            let videoName = uuid.v4() + ".mp4";
            video.mv(path.resolve(__dirname, '..', 'videos', videoName))
            chapter.update({ video: videoName }, { where: { id: chapter_id } })
        }
        if (img) {
            let deleteImg = chapter.imgs
            if (deleteImg !== "Картинки") {
                fs.unlinkSync(path.resolve(__dirname, '..', 'static', deleteImg))
            }
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            chapter.update({ imgs: fileName }, { where: { id: chapter_id } })
        }
        chapter.update({ updated_at: time }, { where: { id: chapter_id } })
        chapter.update({ content: chapter_info }, { where: { id: chapter_id } })
        chapter.update({ name: chapter_name }, { where: { id: chapter_id } })

        const chapterDto = new LessonChapterDto(chapter)
        return { chapter: chapterDto }
    }
}

module.exports = new LessonChapterService()