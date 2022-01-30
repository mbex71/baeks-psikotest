// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {accountDetail} from '@services/account'
import { getToken } from 'next-auth/jwt'
import { IUser, Role} from '@modules/entities/user'


type TDetail = {
    name: string;
    tglLahir: Date;
    username: string;
    type: Role;
    password: string;
  }
type Data = {
  data?:TDetail | null,
  message?:string
}

type TParam = {
    id:string
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

  const { id } = req.query as TParam

  const detail = await accountDetail({id:parseInt(id)})
  
  res.status(200).json({
      data:detail
  })
}
