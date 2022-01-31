// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {accountDetail} from '@services/account'
import { getToken } from 'next-auth/jwt'
import { IUser, Role} from '@modules/entities/user'
import {IAccount} from '@modules/dto/account'


type Data = {
  message?:string
}  | any

type TParam = {
    username:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
    const secret = process.env.JWT_SECRET as string
  const token = await getToken({ req ,secret})

  if(!token) {
    return res.status(401).json({
        message: 'Unauthorized Token'
    })
  }

  if(token?.type !== 'ADMIN') {
    return res.status(401).json({
        message: 'Unauthorized Type'
    })
  }

  const { username} = req.query as TParam

  const detail = await accountDetail({username: username})
  
  res.status(200).json(detail)
}
