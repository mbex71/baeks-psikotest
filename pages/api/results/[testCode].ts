import type {NextApiRequest , NextApiResponse } from 'next'
import {resultExam } from 'services/results'
import {getSession} from 'next-auth/react'
import { getToken } from 'next-auth/jwt'

type TParamsResult = {
    testCode:string
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const secret = process.env.JWT_SECRET
    const session = await getToken({req , secret: secret as string})
    const params = req.query as TParamsResult

    

    if(!session){
        return res.status(401).json({status: 401,error: 'Unauthorized'})
    }

    if(req.method === 'GET'){
        
        const results = await resultExam({testCode:params.testCode })
        return res.status(200).json(results)
    }

    
    
}