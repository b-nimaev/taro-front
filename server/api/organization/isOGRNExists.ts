export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {

        const query = await $fetch('http://api:5555/organization/isOGRNExsits', {
            method: 'get',
            params: {
                ogrn: body.ogrn
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
