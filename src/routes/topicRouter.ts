import express from 'express'
import { createTopic, deleteTopic, getTopic, getTopics, updateTopic } from '../controllers/topicController'
import { postRouter } from './postRouter'
const router = express.Router({ mergeParams: true})


router.post('/', createTopic)
router.get('/:topicId', getTopic)
router.get('/', getTopics)
router.patch('/:topicId', updateTopic)
router.delete('/:topicId', deleteTopic)

export { router as topicRouter }