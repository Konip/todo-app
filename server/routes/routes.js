const Router = require('express')
const router = Router()
const taskController = require('../controllers/taskController')
const listsController = require('../controllers/listsController')

router.get('/list', listsController.get)
router.post('/list', listsController.create)
router.put('/list/:id', listsController.rename)
router.delete('/list/:id', listsController.delete)

router.get('/tasks', taskController.getAll)
router.get('/task/:id', taskController.getOne)
router.post('/task', taskController.create)
router.put('/task/:id', taskController.rename)
router.put('/completedTask/:id', taskController.completed)
router.delete('/task/:id', taskController.delete)

module.exports = router