import { NextApiRequest, NextApiResponse } from "next";

import {getSession} from 'next-auth/react'

import {createUserAccount} from 'services/account'
import { getToken } from "next-auth/jwt";

import {TCreateUserAccount} from '@modules/dto/account'

export default async function name(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({req})
    const secret = process.env.JWT_SECRET
    const token = await getToken({req, secret})

    
    if(!token) {
        res.status(401).json({message:'Unauthorized'})
    }

     if(req.method === 'POST'){
         const data = req.body as TCreateUserAccount
        //  const userId: number = parseInt(session?.user?.id as string)
        const accountType: string = token?.type as string

        if(accountType !== 'ADMIN'){

            
            return res.status(401).json({message:'Unauthorized'})
        }
        
            const userTest = await createUserAccount(data)
            console.log(userTest)
            return res.status(200).json(userTest)

            // return res.status(200).json(data)
         
        }

     else{
         return res.status(500).json({message:'Method not allowed'})
     }
}