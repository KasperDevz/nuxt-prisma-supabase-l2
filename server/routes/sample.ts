// GET: http://localhost:3000/sample

export default defineEventHandler((event) => {

    if (event.context.auth.role !== 'admin') {
        throw createError(
            {
                statusCode: 403,
                message: 'Unauthorized'
            }
        )
    }

    return{
        message: `Welcome user ${event.context.auth.user} your have perrmision ${event.context.auth.permission}`
    }
})