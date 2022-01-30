import type { NextFetchEvent } from 'next/server'
import {NextResponse} from 'next/server'
import {NextApiRequest} from 'next'
import {getToken} from 'next-auth/jwt'

export async function  middleware(req: NextApiRequest, ev: NextFetchEvent) {
    const secret = process.env.JWT_SECRET
    const session = await getToken({req, secret: secret as string})

    if(!session) {
        return NextResponse.redirect('/auth/signin')
    }
    
    //If not ADMIN, will redirect to /exam
    if(session && session.type !== 'USER'){
        return NextResponse.redirect('/dashboard')
    }

    //Redirect if Authenticated & isAdmin
    return NextResponse.next()

}