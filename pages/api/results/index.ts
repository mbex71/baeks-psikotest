import type {NextApiRequest , NextApiResponse } from 'next'
import {resultListExam } from 'services/results'
import {getSession} from 'next-auth/react'
import { StatusTest } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const secret = process.env.JWT_SECRET
    const token = await getToken({req, secret:secret as string})

    if(!token){
        return res.status(401).json({status: 401,error: 'Unauthorized'})
    }

    if(req.method === 'GET'){
        const data = await resultListExam({username: token.username as string})
        return res.status(200).json(data)
    }

    
    
}