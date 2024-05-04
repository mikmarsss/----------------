const LessonChapterService = require('../service/lessonChapter-service')

class LessonChapterController {
    async createChapter(req, res, next) {
        try {
            const { course_lesson_id } = req.body
            const chapterData = await LessonChapterService.createChapter(course_lesson_id)
            return res.json(chapterData)
        } catch (e) {
            next(e)
        }
    }

    async fetchChapter(req, res, next) {
        try {
            const { chapter_id } = req.body
            const chapterData = await LessonChapterService.fetchChapter(chapter_id)
            return res.json(chapterData)
        } catch (e) {
            next(e)
        }
    }

    async fetchChapters(req, res, next) {
        try {
            const { course_lesson_id } = req.body
            const chapterData = await LessonChapterService.fetchChapters(course_lesson_id)
            return res.json(chapterData)
        } catch (e) {
            next(e)
        }
    }

    async saveChapter(req, res, next) {
        try {
            if (req.files) {
                const { chapter_id, chapter_info, chapter_name } = req.body
                const { img } = req.files
                const chapterData = await LessonChapterService.saveChapter(chapter_id, chapter_info, chapter_name, img)
                return res.json(chapterData)
            } else {
                const { chapter_id, chapter_info, chapter_name } = req.body
                const chapterData = await LessonChapterService.saveChapter(chapter_id, chapter_info, chapter_name)
                return res.json(chapterData)
            }

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new LessonChapterController()