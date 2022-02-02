// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {selectAllUserAccount} from '@services/account'
import { getToken } from 'next-auth/jwt'
import { updateTimer , getTimer} from '@services/timer'


type TParamTimer = {
    timer:number
}

type Data = {
  data?:any
  message?:string
} | {
  timer:number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
    const secret = process.env.JWT_SECRET as string
  const token = await getToken({ req ,secret})

  const params = req.body as TParamTimer

  

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


  if(req.method === 'POST'){
    if(!params.timer){
      return res.status(400).json({
            message: 'Bad Request'
      })
  }
    const data = await updateTimer(params.timer)
  
    res.status(200).json({
        data:params.timer,
        message:'Success Update Timer'
    })
  }

  if(req.method === 'GET'){
    const data = await getTimer()
  
    res.status(200).json(data)
  }
  
}
