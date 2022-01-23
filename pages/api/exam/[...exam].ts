import type {NextApiRequest , NextApiResponse } from 'next'
import {listUserExams, userExam } from '@models/exam'
import {getSession} from 'next-auth/react'
import { StatusTest } from '@prisma/client'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const session = await getSession({req})

    if(!session){
        return res.status(401).json({status: 401,error: 'Unauthorized'})
    }

    if(req.method === 'GET'){
        const userId = session?.user?.id as string
        const testId = req?.query.exam[0] 
        const soalId = req?.query.exam[1] 
        
        const data = await userExam(parseInt(userId),testId, parseInt(soalId))

        res.status(200).json(data)
        
    }

    
    
}