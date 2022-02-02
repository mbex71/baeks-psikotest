import { NextApiRequest, NextApiResponse } from "next";

import {getSession} from 'next-auth/react'

import {createTest} from 'services/exam'
import { getToken } from "next-auth/jwt";
import { TParamDetailAccount } from "@modules/dto/account";
import { TParamCreateTest } from "@modules/dto/exam";

type postData = {
    testId: string
}

export default async function name(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({req})
    const secret = process.env.JWT_SECRET
    const token = await getToken({req, secret:secret as string})

    
    if(!token) {
        res.status(401).json({message:'Unauthorized'})
    }

     if(req.method === 'POST'){
         const {username , tujuan} = req.body as TParamCreateTest
        //  const userId: number = parseInt(session?.user?.id as string)
        const userId: number = parseInt(token?.id as string)
         
         const userTest = await createTest({username, tujuan})
         return res.status(200).json(userTest)
     }

     else{
         return res.status(500).json({message:'Method not allowed'})
     }
}