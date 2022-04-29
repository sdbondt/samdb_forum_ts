import { UpdateTopicValidationInterface } from "../../types/types"
import { Topic } from "../../entities/TopicEntity"

export const validateUpdateTopic = async (title: string, firstPost: string, topic: Topic): Promise<UpdateTopicValidationInterface> => {
    const obj: UpdateTopicValidationInterface = {
        valid: true,
        msg: 'Topic updated',
        topic
    }
    
    if (!title && !firstPost) {
        obj.valid = false
        obj.msg = 'Invalid request, title and first post must be submitted'
    }

    if (title) {
        const titleExists = await Topic.findOne({ where: { title }})
        if (title.length > 50) {
            obj.valid = false
            obj.msg = 'Invalid request, title cannot be longer than 50 characters'
        } else if(titleExists) {
            obj.valid = false
            obj.msg = 'Invalid request, topic with that title already exists'
        } else {
            topic.title = title
        }
    }

    if (firstPost) {
        topic.firstPost = firstPost
    }
    return obj
}