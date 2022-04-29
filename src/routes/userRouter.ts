import express from 'express'
import { authorize } from '../middleware/authorizeMiddleware'
import { deleteUser, getUser, getUsers, muteUser, updateUser } from '../controllers/userController'
const router = express.Router()

router.post('/:userId/mute', authorize, muteUser)
router.get('/:userId', getUser)
router.get('/', getUsers)
router.patch('/:userId', updateUser)
router.delete('/:userId', deleteUser)


export { router as userRouter }