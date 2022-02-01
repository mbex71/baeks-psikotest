// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from 'next-auth/react'
import prisma from '@configs/prisma'



type TData = any

type TParam = {
    username:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TData>
) {

    const { username} = req.query as TParam

    const data = await prisma.account.findUnique({
        where:{
            username:username
        },
        include:{
            Test:true
        }
    })

    res.status(200).json(data)
}
