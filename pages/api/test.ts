// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from 'next-auth/react'
import prisma from '@configs/prisma'

type TDetails = {
    username:string
    name:string
}

type TData = {
    data?:TDetails | null,
    message?:string
}

type TParam = {
    username:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TData>
) {

    const params = req.query as TParam

    const detailAccount = await prisma.account.findUnique({
        where:{
            username: params.username
        },
        select:{
            username:true,
            name:true,
            Test:true
        }
    })

    res.status(200).json({
        data:detailAccount,
        message:'Success Fetch Data'
    })
}
