import express from 'express'
import { authorize } from '../middleware/authorizeMiddleware'
import { createCategory, getCategories, getCategory, deleteCategory } from '../controllers/categoryController'
import { topicRouter } from './topicRouter'
import { postRouter } from './postRouter'
const router = express.Router()

router.use('/:categoryId/topics/:topicId', postRouter)
router.use('/:categoryId/topics', topicRouter)
router.post('/', authorize, createCategory)
router.get('/:categoryId', getCategory)
router.get('/', getCategories)
router.delete('/:categoryId', authorize, deleteCategory)


export { router as categoryRouter }