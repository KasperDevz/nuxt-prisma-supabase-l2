import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const query = getQuery(event)

    const title = query.title as string

    const posts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: title,
                        mode: 'insensitive'
                    },
                },
                {
                    content: {
                        contains: title,
                        mode: 'insensitive'
                    }
                }
            ],
        },

        select: {
            id: true,
            title: true,
            content: true,
            published: true
        },
        orderBy: {
            id: 'desc'
        }
    })

    return posts
})