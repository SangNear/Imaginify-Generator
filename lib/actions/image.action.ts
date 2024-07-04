"use server"

import { revalidatePath } from "next/cache"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"
import User from "../database/models/user.model"
import Image from "../database/models/image.model"

export async function addImage({image, userId,path} : AddImageParams) {
    try {
        await connectToDatabase()
        const author = await User.findById(userId)

        if(!author) {
            throw new Error("User not found")
        }
        const newImg = await Image.create({
            ...image,
            author: author._id
        })

        revalidatePath(path)

        return JSON.parse(JSON.stringify(newImg))
    } catch (error) {
        handleError(error)
    }
}