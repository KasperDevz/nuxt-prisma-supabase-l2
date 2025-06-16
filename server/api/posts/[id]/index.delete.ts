import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError(
            {
                statusCode: 400,
                message: 'invalid id'
            }
        )
    }
    const post = await prisma.post.delete({
        where: {
            id: parseInt(id)
        }
    })

    return {
        statusCode: 200,
        body: post
    }
})