import { verifyCookie } from '$lib/utils';
import {getEventData} from "$lib/database"
import { sendMessage } from '$lib/telegram';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request}){
    if(!verifyCookie(request)){
        return {
            status: 401,
            body: {
                error: true,
                message: "Invalid Authorization"
            }
        }
    }

    const data = await request.json()
    if(!data.hasOwnProperty("event") || !data.hasOwnProperty("amount")){
        return {
            status: 400,
            body: {
                error: true,
                message: "Invalid data"
            }
        }
    }

    try{
        const res = await getEventData(data.event)
        if(res){
            await sendMessage(data.amount, data.event)
            return {
                status: 200,
                body: {
                    error: false
                }
            }
        } else{
            return {
                status: 404,
                body: {
                    error: true,
                    message: "event not found"
                }
            }
        }
    } catch(err){
        console.error(err)
        return {
            status: 500,
            body: {
                error: true,
                message: "something went wrong"
            }
        }
    }

}