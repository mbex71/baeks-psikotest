import type {NextApiRequest , NextApiResponse } from 'next'
import {listUserExams } from 'services/exam'
import {getSession} from 'next-auth/react'
import { StatusTest } from '@prisma/client'
import {changeExamStatus} from '@services/exam'
type TParam = {
    status:StatusTest
    testCode:string
  }

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const session = await getSession({req})

    if(!session){
        return res.status(401).json({status: 401,error: 'Unauthorized'})
    }

    if(req.method === 'POST'){
        const userId = session?.user?.id as string
        const {status , testCode} = req.body as TParam

        const updateExamStatus = await changeExamStatus({status: status, testCode:testCode })
        return res.status(200).json({
            message:status
        })
    }

    
    
}