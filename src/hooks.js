// @ts-nocheck
import { verifyCookie } from '$lib/utils';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    try{
        const res = await verifyCookie(event.request)
        if(res){
            // @ts-ignore
            res.authenticated = true
            // @ts-ignore
            event.locals.user = res
        } else{
            // @ts-ignore
            event.locals.user = {authenticated: false}
        }
    } catch(err){
        console.error(err)
        // @ts-ignore
        event.locals.user = {authenticated: false}
    }
    
    const response = await resolve(event);
    return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
    return event.locals.user
      ? {
          user: {
            id: event.locals.user.user,
            email: event.locals.user.email,
            authenticated: event.locals.user.authenticated
          }
        }
      : {
          user: {
              id: null,
              email: null,
              authenticated: false
          }
      };
}