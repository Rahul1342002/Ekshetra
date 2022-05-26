// @ts-nocheck
import { addEventById, getUserByID } from '$lib/database'
import { verifyCookie } from '$lib/utils'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request}) {
    try{
        const data = await request.json()
        if(!data.hasOwnProperty("event") || !data.hasOwnProperty("eventID")){
            return {
                status: 400,
                body: {
                    error: true,
                    message: "Invalid Data"
                }
            }
        }
        const token = await verifyCookie(request)
        const res = await getUserByID(token.id)
        if(!res){
            return {
                status: 403,
                body: {
                    error: true,
                    message: "user not found"
                }
            }
        }

        const res1 = await addEventById(data)
        if(res1){
            return {
                status: 200,
                body: {
                    result: true
                }
            }
        }

        return {
            status: 500,
            body: {
                error: true,
                message: "something went wrong while adding data"
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