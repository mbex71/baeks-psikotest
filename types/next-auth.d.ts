import NextAuth from 'next-auth';
import {JWT} from 'next-auth/jwt'

declare module "next-auth"{
    interface Session{
        user:{
            name?:string | null
            username?:string | unknown
            type?: 'ADMIN' | 'USER' | unknown
        }
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        name?:string | null
        username?:string | unknown
        type?: 'ADMIN' | 'USER' | unknown
    }
}