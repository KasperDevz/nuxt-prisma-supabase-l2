export default defineNuxtRouteMiddleware( async (to, from) => {
    const token = useCookie('auth-token').value 

    if(!token) {
        return navigateTo('/login1')
    }

    const supabase = useSupabaseClient()
    const { data:user, error } = await supabase.auth.getUser(token)

    if(error || !user) {
        return navigateTo('/login')
    }
})