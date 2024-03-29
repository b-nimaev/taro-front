export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {

        console.log(body)

        const query = await $fetch('http://api:5555/cash/checkPseudonym', {
            method: 'get',
            params: {
                cashPseudonym: body.pseudonym 
            },
            headers: {
                authorization: body.authentication,
            }
        })

        return query

    } catch (error) {

        return error

    }

})
