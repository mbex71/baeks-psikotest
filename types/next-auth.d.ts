import NextAuth from 'next-auth';
import {JWT} from 'next-auth/jwt'

declare module "next-auth"{
    interface Session{
        user:{
            id?:string | null
            name?:string | null
            username?:string | unknown
            type?: 'ADMIN' | 'USER' | unknown
        }
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        id?:string | null
        name?:string | null
        username?:string | unknown
        type?: 'ADMIN' | 'USER' | unknown
        
    }
}