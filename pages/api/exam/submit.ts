import type {NextApiRequest , NextApiResponse } from 'next'
import {listUserExams, userExam } from 'services/exam'
import {getSession} from 'next-auth/react'
import { StatusTest } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
import {submitJawaban} from '@services/exam'

export type TPostSubmitJawaban = {
    testCode:string,
    soaldId:number,
    optionId:number,
    answer
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const secret = process.env.JWT_SECRET
    const session = await getToken({req, secret})

    if(!session){
        return res.status(401).json({status: 401,error: 'Unauthorized woi'})
    }

    if(req.method === 'POST'){
        const accountId = parseInt(session?.user?.id as string)
        const params= req?.body as TPostSubmitJawaban
        // const soalId = parseInt(req?.query.exam[1] )
        
        const data = await submitJawaban(params)

        
        res.status(200).json(data)
        
    }
    
    
}