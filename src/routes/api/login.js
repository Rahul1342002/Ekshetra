// @ts-nocheck
import { getUserByEmail } from "$lib/database";
import jsonwebtoken from "jsonwebtoken";
import { jsonSecret } from "$lib/stores";
import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request}) {
    try{
        const data = await request.json()
        if(!data.hasOwnProperty("email") || !data.hasOwnProperty("password")){
            return {
                status: 403,
                body: {
                    error: true,
                    message: "Invalid data"
                }
            }
        }

        const r = await getUserByEmail(data.email)
        if(!r){
            return {
                status: 401,
                body: {
                    error: true,
                    message: "invalid credentials"
                }
            }
        }

        if(r.password === data.password){
            const token = jsonwebtoken.sign({user: r._id, email: r.email}, jsonSecret, { expiresIn: 10800 })
            return {
                status: 200,
                body: {
                    result: {
                        id: r._id,
                        email: r.email,
                        events: r.events,
                        name: r.name,
                        whatsapp: r.whatsapp
                    }
                },
                headers: {
                    "Set-Cookie": serialize("auth_token", token, {
                        path: "/",
                        httpOnly: true,
                        sameSite: "strict",
                        secure: false,
                        maxAge: 10800
                    })
                }
            }

        
        } else{
            return {
                status: 401,
                body: {
                    error: true,
                    message: "invalid credentials"
                }
            }
        }
        
    } catch(err){
        console.log(err)
        return {
            status: 500,
            body: {
                message: "something went wrong"
            }
        }
    }
}