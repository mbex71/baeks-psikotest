import { NextApiRequest, NextApiResponse } from "next";

import {getSession} from 'next-auth/react'

type postData = {
    testId: string
}

export default async function name(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({req})

     if(req.method === 'POST'){
         const data = req.body as postData
         const userId: number = parseInt(session?.user?.id as string)
         
         return res.status(200).json(data)
     }
}