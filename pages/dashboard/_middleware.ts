import type { NextFetchEvent } from 'next/server'
import {NextResponse} from 'next/server'
import {NextApiRequest} from 'next'
import {getToken} from 'next-auth/jwt'

export async function  middleware(req: NextApiRequest, ev: NextFetchEvent) {
    const session = await getToken({req, secret: process.env.JWT_SECRET})

    if(!session) {
        return NextResponse.redirect('/auth/signin')
    }
    
    //If not ADMIN, will redirect to /exam
    if(session && session.type !== 'ADMIN'){
        return NextResponse.redirect('/exam')
    }

    //Redirect if Authenticated & isAdmin
    return NextResponse.next()

}