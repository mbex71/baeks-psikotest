import NextAuth from 'next-auth';
import {JWT} from 'next-auth/jwt'

declare module "next-auth"{
    interface Session{
        user:{
            id?:string | null
            name?:string | null
            username?:string | unknown
            type?: 'ADMIN' | 'USER' | unknown
        },
        accessToken?: string | null
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        id?:string | null
        name?:string | null
        username?:string | unknown
        type?: 'ADMIN' | 'USER' | unknown
        access_token?: string | null
    }
}