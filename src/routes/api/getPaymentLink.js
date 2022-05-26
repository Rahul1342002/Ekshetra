import { addEventData } from '$lib/database';
import { events } from '$lib/stores';
import { verifyCookie } from '$lib/utils';
import { v4 as uuidv4 } from 'uuid';

function getPrice(id, members){
    for(let event of events){
        if(event.id === id){
            if(event.members){
                if(event.members === members.length){
                    return event.price
                }
            } else{
                return event.price
            }
        }
    }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request}){
    if(verifyCookie(request)){
        const data = await request.json()
        if(!data.hasOwnProperty("name") || !data.hasOwnProperty("email") || !data.hasOwnProperty("number") || !data.hasOwnProperty("event")){
            return {
                status: 400,
                body: {
                    error: true,
                    message: "Invalid data"
                }
            }
        }

        let amount = null

        for(let event of data.event){
            if(!event.hasOwnProperty("id") || !event.hasOwnProperty("users")){
                return {
                    status: 400,
                    body: {
                        error: true,
                        message: "Invalid data"
                    }
                }
            }

            let price = getPrice(event.id, event.users)
            console.log(price)
            if(price != null){
                // @ts-ignore
                amount += price
            } else{
                return {
                    status: 400,
                    body: {
                        error: true,
                        message: "unable to find event / members dont match. Please check again and retry"
                    }
                }
            }
        }

        data.amount = amount

        let id = uuidv4()
        const r = await addEventData(data.event, id)
        if(!r){
            return {
                status: 500,
                body: {
                    error: true,
                    message: "something went wrong while adding data"
                }
            }
        }

        data.event = id

        return {
            status: 200,
            body: {
                error :false,
                url: `upi://pay?pa=paytmqr281005050101p7ipg24dgi7u@paytm&pn=Paytm%20Merchant&mc=5499&mode=02&am=${amount}.00&tn=${id}&orgid=000000&paytmqr=281005050101P7IPG24DGI7U&sign=MEYCIQDSrcuaIWWNbUYnOf2XIAuGYf/jby9uxVTJ8FKDmkxgQAIhAMtEqPBCJkGe+rFSSsZlUtRe9ukjbc5Yp3Ac8GSdm3RI`,
                event: id,
                amount
            }
        }
    } else{
        return {
            status: 401,
            body: {
                error: true,
                message: "Invalid Authorization"
            }
        }
    }
}