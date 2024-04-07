
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
    test_result: { type: DataTypes.STRING, allowNull: true }
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
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
}, { sequelize, timestamps: false })

const Course_module = sequelize.define('course_module', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW },
    course_info_id: { type: DataTypes.INTEGER },
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
    imgs: { type: DataTypes.STRING }
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

Module_lesson.hasMany(Lesson_Chapter, { foreignKey: 'course_lesson_id' })
Lesson_Chapter.belongsTo(Module_lesson, { foreignKey: 'course_lesson_id' })

Course_module.hasMany(Module_lesson, { foreignKey: 'course_module_id' })
Module_lesson.belongsTo(Course_module, { foreignKey: 'course_module_id' })

Course_info.hasMany(Course_module, { foreignKey: 'course_info_id' })
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

Course_info.hasMany(Rating, { foreignKey: 'course_info_id' })
Rating.belongsTo(Course_info, { foreignKey: 'course_info_id' })

Creator.hasMany(Course_info, { foreignKey: 'creator_id' })
Course_info.belongsTo(Creator, { foreignKey: 'creator_id' })

Course_info.hasMany(Favorite_courses, { foreignKey: 'course_info_id' })
Favorite_courses.belongsTo(Course_info, { foreignKey: 'course_info_id' })

Course_info.hasMany(Active_courses, { foreignKey: 'course_info_id' })
Active_courses.belongsTo(Course_info, { foreignKey: 'course_info_id' })

Course_info.hasMany(Done_courses, { foreignKey: 'course_info_id' })
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
}
