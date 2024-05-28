import { revalidatePath } from "next/cache"
import User from "../database/models/user.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"

export const createUser = async (user: CreateUserParams) => {
    try {
        await connectToDatabase()
        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }

}

export const getUser = async (userId: string) => {
    try {
        await connectToDatabase()
        const user = await User.findOne({ clerkId: userId })
        if (!user) {
            throw new Error("User not found")
        }
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}
export const updateUser = async (userId: string, user: UpdateUserParams) => {
    try {
        await connectToDatabase()
        const userUpdate = await User.findByIdAndUpdate({
            clerkId: userId
        }, user, {
            new: true
        })

        if (!updateUser) {
            throw new Error("User update failed")
        }
        return JSON.parse(JSON.stringify(userUpdate))

    } catch (error) {
        handleError(error)
    }
}
export const deleteUser = async (userId: string) => {
    try {
        await connectToDatabase()
        const userDelete = await User.findByIdAndDelete({ clerkId: userId })
        if (!userDelete) throw new Error("User delete failed!")
        revalidatePath("/")
        return userDelete ? JSON.parse(JSON.stringify(userDelete)) : null
    } catch (error) {
        handleError(error)
    }
}