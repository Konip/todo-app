const {List} = require('../models/models')

class ListsController {
    async create(req, res) {
        const {name, color} = req.body
        const list = await List.create({name, color})
        return res.status(200).json(list)
    }

    async get(req, res) {
        const lists = await List.findAll({order: [['createdAt', 'ASC']]})
        return res.json(lists)
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
        await List.destroy({where: {id}})
        return res.status(200).json({message: 'Deleted successfully'})
    }
}

module.exports = new ListsController()