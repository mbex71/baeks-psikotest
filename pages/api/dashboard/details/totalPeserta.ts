// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {selectAllUserAccount} from '@services/account'
import { getToken } from 'next-auth/jwt'
import { totalPeserta} from '@services/dashboard'




type Data = {
  data?:any
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

  if(req.method === 'GET'){
    const data = await totalPeserta()
  
    res.status(200).json({
        data:data,
        message:'Success Get Total Peserta'
    })
  }
  
}
