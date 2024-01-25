export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)
    const query = await $fetch('http://api:5555/backendapi/auth/login', {
        method: 'post',
        body: {
            password: body.password,
            email: body.username
        }
    })

    return query

})
