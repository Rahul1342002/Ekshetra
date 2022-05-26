// @ts-nocheck
import { addUser, getUserByEmail } from "$lib/database";
import jsonwebtoken from "jsonwebtoken";
import { jsonSecret } from "$lib/stores";
import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request}) {
    try{
        const data = await request.json()
        if(!data.hasOwnProperty("name") || !data.hasOwnProperty("roll") || !data.hasOwnProperty("email") || !data.hasOwnProperty("password") || !data.hasOwnProperty("whatsapp") || !data.hasOwnProperty("department") || !data.hasOwnProperty("college")){
            return {
                status: 403,
                body: {
                    error: true,
                    message: "Invalid data"
                }
            }
        }

        const r = await getUserByEmail(data.email)
        if(r){
            return {
                status: 403,
                body: {
                    error: true,
                    message: "email already registered"
                }
            }
        }

        const res = await addUser(data)
        const token = jsonwebtoken.sign({user: res.insertedId, email: data.email}, jsonSecret, { expiresIn: 10800 })
        return {
            status: 200,
            body: {
                result: {
                    id: res.insertedId,
                    email: data.email,
                    events: [],
                    name: data.name,
                    whatsapp: data.whatsapp
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