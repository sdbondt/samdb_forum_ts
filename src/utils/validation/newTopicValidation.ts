import { Topic } from "../../entities/TopicEntity"
import { ReturnValidationInterface } from "../../types/types"

export const validateNewTopic = async (title: string, firstPost: string): Promise<ReturnValidationInterface> => {
    const obj: ReturnValidationInterface = {
        msg: 'New category is valid.',
        valid: true
    }
    const titleExists = await Topic.findOne({ where: { title }})
    if (!title || !firstPost) {
        obj.valid = false
        obj.msg = 'Invalid request, title and first post must be submitted'
    }

    if (title.length > 50) {
        obj.valid = false
        obj.msg = 'Invalid request, title cannot be longer than 50 characters'
    }
    
    if (titleExists) {
        obj.valid = false
        obj.msg = 'Invalid request, topic with that title already exists'
    }

    return obj
}