export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)
    const query = await $fetch('http://localhost:5555/auth/login', {
        method: 'post',
        body: {
            password: body.password,
            email: body.username
        }
    })

    return query

})
