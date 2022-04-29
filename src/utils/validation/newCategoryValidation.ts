import { ReturnValidationInterface, SectionCategoryEnum } from "../../types/types"
import { Category } from "../../entities/CategoryEntity"

export const validateNewCategory = async (name: string): Promise<ReturnValidationInterface> => {
    const obj: ReturnValidationInterface = {
        msg: 'New category is valid.',
        valid: true
    }
    const categoryExists = await Category.findOne({ where: { name } })
    if (categoryExists) {
        obj.valid = false
        obj.msg = 'Category already exists'
    }

    if (!Object.values(SectionCategoryEnum).includes(name as unknown as SectionCategoryEnum)) {
        obj.valid = false
        obj.msg = 'Category must be one of the specified values.'
    }

    return obj
}