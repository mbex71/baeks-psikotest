import type {NextApiRequest , NextApiResponse } from 'next'
import {listUserExams, userExam } from 'services/exam'
import {getSession} from 'next-auth/react'


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const session = await getSession({req})

    if(!session){
        return res.status(401).json({status: 401,error: 'Unauthorized'})
    }

    if(req.method === 'GET'){
        const accountId = parseInt(session?.user?.id as string)
        const testCode = req?.query.exam[0] 
        const soalId = parseInt(req?.query.exam[1] )
        
        const data = await userExam(accountId,testCode, soalId)

        res.status(200).json(data)
        
    }

    
    
}