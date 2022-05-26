import { getUserByID, updatePremiumByUser } from '$lib/database'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request}) {
    try{
        const data = await request.json()
        if(!data.hasOwnProperty("id")){
            return {
                status: 400,
                body: {
                    error: true,
                    message: "Invalid Data"
                }
            }
        }

        const res = await getUserByID(data.id)
        if(!res){
            return {
                status: 401,
                body: {
                    error: true, 
                    message: "user not found"
                }
            }
        }

        const r = await updatePremiumByUser(data.id)
        if(!r){
            return {
                status: 401,
                body: {
                    error: true, 
                    message: "something went wrong"
                }
            }
        }

        return {
            status: 200,
            body: {
                result: true
            }
        }
    } catch(err){
        console.log(err)
        return {
            status: 500,
            body: {
                error: true,
                message: "something went wrong"
            }
        }
    }
}