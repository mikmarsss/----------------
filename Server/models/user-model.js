
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
    activationLink: { type: DataTypes.STRING }
})

const User_courses = sequelize.define('user_courses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    time: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
})

const Creator = sequelize.define('creator', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, }
})

const TokenSchema = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
})

User.hasOne(User_courses)
User_courses.belongsTo(User)

User.hasOne(TokenSchema, { foreignKey: 'userId' })
TokenSchema.belongsTo(User)

User.hasOne(Creator)
Creator.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User_courses.hasMany(Done_courses)
Done_courses.belongsTo(User_courses)

User_courses.hasMany(Active_courses)
Active_courses.belongsTo(User_courses)


User_courses.hasMany(Favorite_courses)
Favorite_courses.belongsTo(User_courses)

Done_courses.hasOne(Course_info)
Course_info.belongsTo(Done_courses)

Active_courses.hasOne(Course_info)
Course_info.belongsTo(Active_courses)

Favorite_courses.hasOne(Course_info)
Course_info.belongsTo(Favorite_courses)

Course_info.hasMany(Rating)
Rating.belongsTo(Course_info)

Creator.hasMany(Course_info)
Course_info.belongsTo(Creator)

module.exports = {
    User,
    User_courses,
    Done_courses,
    Active_courses,
    Favorite_courses,
    Course_info,
    Creator,
    Rating,
    TokenSchema
}
