const {List} = require('../models/models')
const {Task} = require('../models/models')

class ListsController {
    async create(req, res) {
        const {name, color} = req.body
        const list = await List.create({name, color})
        return res.status(200).json(list)
    }

    async get(req, res) {
        const lists = await List.findAll({order: [['createdAt', 'ASC']]})
        const tasks = await Task.findAll({order: [['createdAt', 'ASC']]})
        const result = lists.map(({id, name, color}) => {
            return {id, name, color, tasks: tasks.filter(el => el.listId === id)}
        })
        return res.json(result)
    }

    async rename(req, res) {
        const {name} = req.body
        const {id} = req.params
        await List.update(
            {name: name},
            {where: {id}}
        )
        return res.json('Update successfully')
    }

    async delete(req, res) {
        const {id} = req.params
        await Task.destroy({where: {listId: id}})
        await List.destroy({where: {id}})
        return res.status(200).json({message: 'Deleted successfully'})
    }
}

module.exports = new ListsController()