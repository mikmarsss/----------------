const LessonChapterService = require('../service/lessonChapter-service')

class LessonChapterController {
    async createChapter(req, res, next) {
        try {
            const { lessonId, lessonNumber } = req.body
            const chapterData = await LessonChapterService.createChapter(lessonId, lessonNumber)
            return res.json(chapterData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new LessonChapterController()