export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id')

    // samit?type=admin&page=1
    const query = getQuery(event)

    return {
        id: id,
        name : 'user API from server/route/users/[id].ts',
        query: query,
    }
})