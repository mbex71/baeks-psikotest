// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from 'next-auth/react'
import prisma from '@configs/prisma'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const data = await prisma.account.findUnique({
        where:{
            id: 3,
            
        },
        select:{
            name:true,
            Test:{
                where:{
                    id:1
                },
                select:{
                    id:true,
                    testCode:true,
                    soalOnTest:{
                        select:{
                            id:true,
                            Soal:{
                                select:{
                                    id:true,
                                    question:true,
                                    Options:{
                                        select:{
                                            id:true,
                                            question:true,
                                            correctAnswer:true,
                                            wrongAnswer:true,
                                            Jawaban:{
                                                select:{
                                                    Options:{
                                                        select:{
                                                            id:true,
                                                            correctAnswer:true,
                                                        }
                                                    },
                                                    answers:true,
                                                    status:true,
                                                }
                                            },
                                        }
                                    }
                                }
                            },
                            
                        }
                    }
                }
            }
        }
    })
  
  res.status(200).json(data)
}
