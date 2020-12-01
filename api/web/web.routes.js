const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getWeb, getWebs, deleteWeb, updateWeb, addWeb} = require('./web.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)


router.get('/', getWebs)
router.get('/:id', getWeb)
router.put('/:id',  updateWeb)
router.post('/',  addWeb)
// router.put('/:id',  requireAuth, updateWeb)
router.delete('/:id',  deleteWeb)
// router.delete('/:id',  requireAuth, requireAdmin, deleteWeb)

module.exports = router