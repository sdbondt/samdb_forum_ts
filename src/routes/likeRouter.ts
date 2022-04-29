import express from 'express'
import { like } from '../controllers/likeController'
const router = express.Router({ mergeParams: true})

router.post('/', like)

export { router as likeRouter }