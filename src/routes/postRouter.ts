import express from 'express'
import { createPost, updatePost, getPost, getPosts, deletePost } from '../controllers/postControllers'
import { likeRouter } from './likeRouter'
const router = express.Router({ mergeParams: true})

router.use('/:postId/like', likeRouter)
router.post('/', createPost)
router.get('/:postId', getPost)
router.get('/', getPosts)
router.delete('/:postId', deletePost)
router.patch('/:postId', updatePost)

export { router as postRouter }