export default defineEventHandler((event) => {
    event.context.auth = {
        user: 'john'
        ,role: 'admin'
        ,permission: ['read','write']
    }

    //console.log(event.context.auth);
})