import type {NextApiRequest , NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import {submitJawaban} from '@services/exam'


type TJawaban = {
    // soaldId:number,
    soalOnTestId:number
    optionId:number,
    answer:string
}
export type TPostSubmitJawaban = {
    testCode:string,
    jawaban:TJawaban[]
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const secret = process.env.JWT_SECRET
    const token = await getToken({req, secret: secret as string})

    if(!token){
        return res.status(401).json({status: 401,error: 'Unauthorized'})
    }

    if(req.method === 'POST'){
        const params= req?.body as TPostSubmitJawaban
        const data = await submitJawaban(params)
        res.status(200).json(data)
        
    }
    
    
}