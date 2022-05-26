// @ts-nocheck
import { getUserByID } from '$lib/database'

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
        return {
            status: 200,
            body: {
                result: {
                    id: res._id,
                    email: res.email,
                    events: res.events,
                    name: res.name,
                    whatsapp: res.whatsapp
                }
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