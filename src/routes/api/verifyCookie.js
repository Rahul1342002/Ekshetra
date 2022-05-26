// @ts-nocheck
import { verifyCookie } from "$lib/utils";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({request}){
    try{
        const res = await verifyCookie(request)
        if(res){
            return {
                status: 200,
                body: {
                    error: false,
                    data: res
                }
            }
        } else{
            return {
                status: 401,
                body: {
                    error: true,
                    message: "invalid token"
                }
            }
        }
    } catch(err){
        console.log(err)
        return {
            status: 401,
            body: {
                error: true,
                message: "invalid token"
            }
        }
    }
}