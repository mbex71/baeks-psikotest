// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {selectAllUserAccount, createUserAccount} from '@services/account'
import { getToken } from 'next-auth/jwt'
import { TCreateUserAccount } from '@modules/dto/account'
import { Test } from '@prisma/client'
import { IUser } from '@modules/entities/user'

type Data = {
  data?:IUser
  message?:string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
    const secret = process.env.JWT_SECRET as string
  const token = await getToken({ req ,secret})

  if(!token) {
    return res.status(401).json({
        message: 'Unauthorized'
    })
  }

  if(token?.type !== 'ADMIN') {
    return res.status(401).json({
        message: 'Unauthorized'
    })
  }

  if(req.method !== 'POST') {
    return res.status(405).json({
        message: 'Method not allowed'
    })
  }

  const params = req.body as TCreateUserAccount

  const data = await createUserAccount({name:params.name, tglLahir:params.tglLahir, tujuan:params.tujuan})
  
  res.status(200).json({
      data:data
  })
}
