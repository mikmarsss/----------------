
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
    img: { type: DataTypes.STRING, allowNull: true }
})

const Done_courses = sequelize.define('done_courses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Active_courses = sequelize.define('active_courses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Favorite_courses = sequelize.define('favorite_courses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Course_info = sequelize.define('course_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    rating: { type: DataTypes.DECIMAL, allowNull: true },
    people: { type: DataTypes.INTEGER, allowNull: true },
    time: { type: DataTypes.INTEGER, allowNull: true },
    img: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: false },
    courseContent: { type: DataTypes.STRING, allowNull: false },
})

const Course_module = sequelize.define('course_module', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
})

const Module_lesson = sequelize.define('module_lesson', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    material: { type: DataTypes.STRING, allowNull: false },
    numberModule: { type: DataTypes.STRING, allowNull: false },

})

const Creator = sequelize.define('creator', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER }
})

const TokenSchema = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
})

Course_module.hasMany(Module_lesson)
Module_lesson.belongsTo(Course_module)

Course_info.hasMany(Course_module)
Course_module.belongsTo(Course_info)

User.hasMany(Done_courses)
Done_courses.belongsTo(User)

User.hasMany(Active_courses)
Active_courses.belongsTo(User)

User.hasMany(Favorite_courses)
Favorite_courses.belongsTo(User)

User.hasOne(TokenSchema, { foreignKey: 'userId' })
TokenSchema.belongsTo(User)

User.hasOne(Creator)
Creator.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Course_info.hasMany(Rating)
Rating.belongsTo(Course_info)

Creator.hasMany(Course_info)
Course_info.belongsTo(Creator)

Course_info.hasMany(Favorite_courses)
Favorite_courses.belongsTo(Course_info)

Course_info.hasMany(Active_courses)
Active_courses.belongsTo(Course_info)

Course_info.hasMany(Done_courses)
Done_courses.belongsTo(Course_info)

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
}
