import type {NextApiRequest , NextApiResponse } from 'next'
import {listUserExams } from 'services/exam'
import {getSession} from 'next-auth/react'
import { StatusTest } from '@prisma/client'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const session = await getSession({req})

    if(!session){
        return res.status(401).json({status: 401,error: 'Unauthorized'})
    }

    if(req.method === 'GET'){
        const userId = session?.user?.id as string
        const status = req.query.status as StatusTest
        return res.status(200).json(await listUserExams(parseInt(userId),status))
    }

    
    
}