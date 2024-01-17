export default defineEventHandler(async (event) => {
    const body = await readBody(event)    
    const query = await $fetch('http://localhost:5555/auth/register', {
        method: 'post',
        body: {
            username: body.username,
            email: body.email,
            password: body.password
        }
    })

    return query

})
