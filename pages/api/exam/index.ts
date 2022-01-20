import type {NextApiRequest , NextApiResponse } from 'next'
import {listUserExams } from '@models/exam'
import {getSession} from 'next-auth/react'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const session = await getSession({req})

    if(!session){
        return res.json({error: 'Terjadi Kesalahan'})
    }

    const userId = session?.user?.id as string

    
    return res.status(200).json(await listUserExams(parseInt(userId)))
    
}