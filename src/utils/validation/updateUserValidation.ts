import { UpdateUserValidationInterface } from "../../types/types"
import { User } from "../../entities/UserEntity"
import { hashPW } from "../auth/auth"
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const validateUserUpdate = async (email: string | null, password: string | null, username: string | null, user: User): Promise<UpdateUserValidationInterface> => {
    const obj: UpdateUserValidationInterface = {
        valid: true,
        msg: 'User updated',
        user,
    }

    if (!email && !password && !username) {
        obj.valid = false
        obj.msg = 'Nothing to update'
    }

    if (email) {
        if (email.match(emailRegex)) {
            const userExists = await User.findOne({ where: { email } })
            if (userExists) {
                obj.valid = false
                obj.msg = 'Bad request, email address already in use.'
            } else {
                user.email = email
            }
        } else {
            obj.valid = false
            obj.msg = 'Bad request, invalid email'
        }
    }

    if (username) {
        user.username = username
    }

    if (password) {
        if (!password.match(passwordRegex)) {
            obj.valid = false
            obj.msg = 'Password must be at least 8 characters long, contain a number and a upper and lower case character.'
        } else {
            const hashedPw = await hashPW(password)
            user.password = hashedPw
        }
    }

    return obj
}