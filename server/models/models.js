const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const List = sequelize.define('list', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
})

const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN },
})

List.hasMany(Task)
Task.belongsTo(List)

module.exports = {
    List,
    Task
}