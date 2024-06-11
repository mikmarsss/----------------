
const { Timestamp } = require('mongodb')
const sequelize = require('../db')
const { DataTypes } = require('sequelize')


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    name: { type: DataTypes.STRING, allowNull: true },
    surname: { type: DataTypes.STRING, allowNull: true },
    dob: { type: DataTypes.DATEONLY, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    isActivated: { type: DataTypes.BOOLEAN, default: false },
    activationLink: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, allowNull: true },
    changeCode: { type: DataTypes.BIGINT, allowNull: true },
    aboutMe: { type: DataTypes.STRING, allowNull: true },
    img: { type: DataTypes.STRING, allowNull: true },
    test_result: { type: DataTypes.STRING, allowNull: true },
    user_done_courses: { type: DataTypes.INTEGER, defaultValue: 0 },
    user_done_lessons: { type: DataTypes.INTEGER, defaultValue: 0 },
    user_done_tasks: { type: DataTypes.INTEGER, defaultValue: 0 }
})

const Done_courses = sequelize.define('done_courses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    course_info_id: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
}, { sequelize, timestamps: false })

const Active_courses = sequelize.define('active_courses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    course_info_id: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
}, { sequelize, timestamps: false })

const Favorite_courses = sequelize.define('favorite_courses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    course_info_id: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }

}, { sequelize, timestamps: false })

const Course_info = sequelize.define('course_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    new_price: { type: DataTypes.DECIMAL, allowNull: false },
    rating: { type: DataTypes.DECIMAL, allowNull: true },
    people: { type: DataTypes.INTEGER, allowNull: true },
    time: { type: DataTypes.INTEGER, allowNull: true },
    img: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: false },
    course_content: { type: DataTypes.STRING, allowNull: false },
    creator_id: { type: DataTypes.INTEGER },
    type: { type: DataTypes.INTEGER, allowNull: false },
    additional_type: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, defaultValue: 'notpublished' },
    amount_done_courses: { type: DataTypes.INTEGER, defaultValue: 0 },
    amount_done_lessons: { type: DataTypes.INTEGER, defaultValue: 0 },
    amount_done_modules: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { sequelize, timestamps: false })

const Course_module = sequelize.define('course_module', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    course_info_id: { type: DataTypes.INTEGER },
    done_modules: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { sequelize, timestamps: false })

const Module_lesson = sequelize.define('module_lesson', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    numberModule: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    course_module_id: { type: DataTypes.INTEGER },
    done_lessons: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { sequelize, timestamps: false })

const Lesson_Chapter = sequelize.define('lesson_chapter', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    numberLesson: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    course_lesson_id: { type: DataTypes.INTEGER },
    done_chapters: { type: DataTypes.INTEGER, defaultValue: 0 },
    imgs: { type: DataTypes.STRING },
    video: { type: DataTypes.STRING, defaultValue: 'video' },
}, { sequelize, timestamps: false })

const Creator = sequelize.define('creator', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
}, { sequelize, timestamps: false })

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER },
    course_info_id: { type: DataTypes.INTEGER },
}, { sequelize, timestamps: false })

const TokenSchema = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
})

const YearIncomeStat = sequelize.define('year_income_stat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    course_info_id: { type: DataTypes.INTEGER, },
    January: { type: DataTypes.INTEGER, defaultValue: 0 },
    February: { type: DataTypes.INTEGER, defaultValue: 0 },
    March: { type: DataTypes.INTEGER, defaultValue: 0 },
    April: { type: DataTypes.INTEGER, defaultValue: 0 },
    May: { type: DataTypes.INTEGER, defaultValue: 0 },
    June: { type: DataTypes.INTEGER, defaultValue: 0 },
    July: { type: DataTypes.INTEGER, defaultValue: 0 },
    August: { type: DataTypes.INTEGER, defaultValue: 0 },
    September: { type: DataTypes.INTEGER, defaultValue: 0 },
    October: { type: DataTypes.INTEGER, defaultValue: 0 },
    November: { type: DataTypes.INTEGER, defaultValue: 0 },
    December: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
}, { sequelize, timestamps: false })

const UserTrainers = sequelize.define('user_trainers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, },
    done_trainers: { type: DataTypes.INTEGER, defaultValue: 1 },
    progress_status: { type: DataTypes.INTEGER, defaultValue: 0 },
    points: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
}, { sequelize, timestamps: false })

const TrainerStatuses = sequelize.define('trainer_statuses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING },
    status_value: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
}, { sequelize, timestamps: false })

const TrainerInfo = sequelize.define('trainer_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defaultValue: 'Новая Задача' },
    content: { type: DataTypes.STRING, defaultValue: 'Новая Задача' },
    user_id: { type: DataTypes.INTEGER },
    tests: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    programming_languages: { type: DataTypes.STRING, defaultValue: 'Pascal' },
    dificult: { type: DataTypes.STRING, defaultValue: 'Легко' },
    created_at: { type: DataTypes.INTEGER },
    updated_at: { type: DataTypes.INTEGER },
}, { sequelize, timestamps: false })

const DoneUserTrainers = sequelize.define('done_user_trainers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    done_trainers: { type: DataTypes.STRING },
    created_at: { type: DataTypes.INTEGER },
    updated_at: { type: DataTypes.INTEGER },
}, { sequelize, timestamps: false })


const firstMonthStudents = sequelize.define('first_month_students', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    course_info_id: { type: DataTypes.INTEGER },
    one: { type: DataTypes.INTEGER, allowNull: false },
    two: { type: DataTypes.INTEGER, allowNull: false },
    three: { type: DataTypes.INTEGER, allowNull: false },
    four: { type: DataTypes.INTEGER, allowNull: false },
    five: { type: DataTypes.INTEGER, allowNull: false },
    six: { type: DataTypes.INTEGER, allowNull: false },
    seven: { type: DataTypes.INTEGER, allowNull: false },
    eight: { type: DataTypes.INTEGER, allowNull: false },
    nine: { type: DataTypes.INTEGER, allowNull: false },
    ten: { type: DataTypes.INTEGER, allowNull: false },
    eleven: { type: DataTypes.INTEGER, allowNull: false },
    twelve: { type: DataTypes.INTEGER, allowNull: false },
    thirteen: { type: DataTypes.INTEGER, allowNull: false },
    fourteen: { type: DataTypes.INTEGER, allowNull: false },
    fifteen: { type: DataTypes.INTEGER, allowNull: false },
    sixteen: { type: DataTypes.INTEGER, allowNull: false },
    seventeen: { type: DataTypes.INTEGER, allowNull: false },
    eighteen: { type: DataTypes.INTEGER, allowNull: false },
    nineteen: { type: DataTypes.INTEGER, allowNull: false },
    twenty: { type: DataTypes.INTEGER, allowNull: false },
    twentyone: { type: DataTypes.INTEGER, allowNull: false },
    twentytwo: { type: DataTypes.INTEGER, allowNull: false },
    twentythree: { type: DataTypes.INTEGER, allowNull: false },
    twentyfour: { type: DataTypes.INTEGER, allowNull: false },
    twentyfive: { type: DataTypes.INTEGER, allowNull: false },
    twentysix: { type: DataTypes.INTEGER, allowNull: false },
    twentyseven: { type: DataTypes.INTEGER, allowNull: false },
    twentyeight: { type: DataTypes.INTEGER, allowNull: false },
    twentynine: { type: DataTypes.INTEGER, allowNull: false },
    thirty: { type: DataTypes.INTEGER, allowNull: false },
    thirtyone: { type: DataTypes.INTEGER, allowNull: false },
})
const secondMonthStudents = sequelize.define('second_month_students', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    course_info_id: { type: DataTypes.INTEGER },
    one: { type: DataTypes.INTEGER, allowNull: false },
    two: { type: DataTypes.INTEGER, allowNull: false },
    three: { type: DataTypes.INTEGER, allowNull: false },
    four: { type: DataTypes.INTEGER, allowNull: false },
    five: { type: DataTypes.INTEGER, allowNull: false },
    six: { type: DataTypes.INTEGER, allowNull: false },
    seven: { type: DataTypes.INTEGER, allowNull: false },
    eight: { type: DataTypes.INTEGER, allowNull: false },
    nine: { type: DataTypes.INTEGER, allowNull: false },
    ten: { type: DataTypes.INTEGER, allowNull: false },
    eleven: { type: DataTypes.INTEGER, allowNull: false },
    twelve: { type: DataTypes.INTEGER, allowNull: false },
    thirteen: { type: DataTypes.INTEGER, allowNull: false },
    fourteen: { type: DataTypes.INTEGER, allowNull: false },
    fifteen: { type: DataTypes.INTEGER, allowNull: false },
    sixteen: { type: DataTypes.INTEGER, allowNull: false },
    seventeen: { type: DataTypes.INTEGER, allowNull: false },
    eighteen: { type: DataTypes.INTEGER, allowNull: false },
    nineteen: { type: DataTypes.INTEGER, allowNull: false },
    twenty: { type: DataTypes.INTEGER, allowNull: false },
    twentyone: { type: DataTypes.INTEGER, allowNull: false },
    twentytwo: { type: DataTypes.INTEGER, allowNull: false },
    twentythree: { type: DataTypes.INTEGER, allowNull: false },
    twentyfour: { type: DataTypes.INTEGER, allowNull: false },
    twentyfive: { type: DataTypes.INTEGER, allowNull: false },
    twentysix: { type: DataTypes.INTEGER, allowNull: false },
    twentyseven: { type: DataTypes.INTEGER, allowNull: false },
    twentyeight: { type: DataTypes.INTEGER, allowNull: false },
    twentynine: { type: DataTypes.INTEGER, allowNull: false },
    thirty: { type: DataTypes.INTEGER, allowNull: false },
    thirtyone: { type: DataTypes.INTEGER, allowNull: false },
})

User.hasOne(DoneUserTrainers, { foreignKey: 'user_id' })
DoneUserTrainers.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(TrainerInfo, { foreignKey: 'user_id' })
TrainerInfo.belongsTo(User, { foreignKey: 'user_id' })

TrainerStatuses.hasMany(UserTrainers, { foreignKey: 'progress_status' })
UserTrainers.belongsTo(TrainerStatuses, { foreignKey: 'progress_status' })

User.hasOne(UserTrainers, { foreignKey: 'user_id' })
UserTrainers.belongsTo(User, { foreignKey: 'user_id' })

Course_info.hasOne(YearIncomeStat, { foreignKey: 'course_info_id' })
YearIncomeStat.belongsTo(Course_info, { foreignKey: 'course_info_id' })

Course_info.hasOne(firstMonthStudents, { foreignKey: 'course_info_id' })
firstMonthStudents.belongsTo(Course_info, { foreignKey: 'course_info_id' })

Course_info.hasOne(secondMonthStudents, { foreignKey: 'course_info_id' })
secondMonthStudents.belongsTo(Course_info, { foreignKey: 'course_info_id' })

Module_lesson.hasMany(Lesson_Chapter, { foreignKey: 'course_lesson_id', onDelete: 'CASCADE', })
Lesson_Chapter.belongsTo(Module_lesson, { foreignKey: 'course_lesson_id' })

Course_module.hasMany(Module_lesson, { foreignKey: 'course_module_id', onDelete: 'CASCADE', })
Module_lesson.belongsTo(Course_module, { foreignKey: 'course_module_id' })

Course_info.hasMany(Course_module, { foreignKey: 'course_info_id', onDelete: 'CASCADE', })
Course_module.belongsTo(Course_info, { foreignKey: 'course_info_id' })

User.hasMany(Done_courses, { foreignKey: 'user_id' })
Done_courses.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Active_courses, { foreignKey: 'user_id' })
Active_courses.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Favorite_courses, { foreignKey: 'user_id' })
Favorite_courses.belongsTo(User, { foreignKey: 'user_id' })

User.hasOne(TokenSchema, { foreignKey: 'userId' })
TokenSchema.belongsTo(User)

User.hasOne(Creator, { foreignKey: 'user_id' })
Creator.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Rating, { foreignKey: 'user_id' })
Rating.belongsTo(User, { foreignKey: 'user_id' })

Course_info.hasMany(Rating, { foreignKey: 'course_info_id', onDelete: 'CASCADE', })
Rating.belongsTo(Course_info, { foreignKey: 'course_info_id' })

Creator.hasMany(Course_info, { foreignKey: 'creator_id' })
Course_info.belongsTo(Creator, { foreignKey: 'creator_id' })

Course_info.hasMany(Favorite_courses, { foreignKey: 'course_info_id', onDelete: 'CASCADE', })
Favorite_courses.belongsTo(Course_info, { foreignKey: 'course_info_id' })

Course_info.hasMany(Active_courses, { foreignKey: 'course_info_id', onDelete: 'CASCADE', })
Active_courses.belongsTo(Course_info, { foreignKey: 'course_info_id' })

Course_info.hasMany(Done_courses, { foreignKey: 'course_info_id', onDelete: 'CASCADE', })
Done_courses.belongsTo(Course_info, { foreignKey: 'course_info_id' })

module.exports = {
    User,
    Done_courses,
    Active_courses,
    Favorite_courses,
    Course_info,
    Course_module,
    Module_lesson,
    Creator,
    Rating,
    TokenSchema,
    Lesson_Chapter,
    secondMonthStudents,
    firstMonthStudents,
    YearIncomeStat,
    UserTrainers,
    TrainerStatuses,
    TrainerInfo
}
