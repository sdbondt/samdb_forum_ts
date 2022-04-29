import { User } from "../../entities/UserEntity"
import { ReturnValidationInterface } from "../../types/types"
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const validateNewUser = async (email: string, password: string, confirmPassword: string, username: string): Promise<ReturnValidationInterface> => {
    const obj: ReturnValidationInterface = {
        msg: 'New category is valid.',
        valid: true
    }
    if (!username) {
        obj.msg = 'You must add a username'
        obj.valid = false
    }
    
    if (!password.match(passwordRegex)) {
        obj.msg = 'Password must be at least 8 characters long, contain a number and a upper and lower case character.'
        obj.valid = false
    }

    if (password !== confirmPassword) {
        obj.msg = 'Password don\'t match.',
        obj.valid = false
    }

    if (!email.match(emailRegex)) {
        obj.valid = false
        obj.msg = 'Invalid email address.'
    }

    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
        obj.valid = false
        obj.msg= 'Email address already in use.'
    }
    return obj
}