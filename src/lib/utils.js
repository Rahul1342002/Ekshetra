import jsonwebtoken from "jsonwebtoken";
import { jsonSecret } from "./stores";
import { parse } from "cookie";

export async function verifyToken(token){
    return new Promise((resolve,reject)=>{
        jsonwebtoken.verify(token,jsonSecret,(err,data)=>{
            if(err){
                reject(err)
            } else{
                resolve(data)
            }
        })
    })
}


export async function verifyCookie(request){
    return new Promise(async (resolve,reject)=>{
        const cookies = parse(request.headers.get("cookie") || '');
        if(!cookies["auth_token"]){
            resolve(false)
        } else{
            try {
                const res = await verifyToken(cookies["auth_token"])
                resolve(res)
            } catch(err){
                resolve(false)
            }
        }
    })
}