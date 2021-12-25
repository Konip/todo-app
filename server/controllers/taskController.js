const {Task} = require('../models/models')

class TaskController {
    async create(req, res) {
        const {name, completed, listId} = req.body
        const task = await Task.create({name, completed, listId})
        return res.json(task)
    }

    async getAll(req, res) {
        const tasks = await Task.findAll({order: [['createdAt', 'ASC']]})
        return res.json(tasks)
    }

    async getOne(req, res) {
        const {id} = req.params
        const tasks = await Task.findAll({
            where: {listId: id},
            order: [['createdAt', 'ASC']]
        })
        return res.json(tasks)
    }

    async rename(req, res) {
        const {name} = req.body
        const {id} = req.params
        await Task.update(
            {name: name},
            {where: {id}}
        )
        return res.json('Update successfully')
    }

    async completed(req, res) {
        const {status} = req.body
        const {id} = req.params
        await Task.update(
            {completed: status},
            {where: {id}}
        )
        return res.json('Update successfully')
    }

    async delete(req, res) {
        const {id} = req.params
        await Task.destroy({where: {id}})
        return res.json('Deleted successfully')
    }
}

module.exports = new TaskController()