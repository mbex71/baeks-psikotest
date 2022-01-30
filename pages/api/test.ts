// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from 'next-auth/react'
import prisma from '@configs/prisma'

type TCorrectPerColumn = {
    soal?: number,
    totalJawaban?: number,
}

type TWrongPerColumn = {
    soal?: number,
    totalJawaban?: number,
}

type TResults = {
  sumCorrect:number
  sumWrong:number
  correctPerColumn:TCorrectPerColumn[]
  wrongPerColumn:TWrongPerColumn[]
  totalDikerjakan:number
  diver:number
}

type TData = {
    data:TResults,
    message:string
}

type TParam = {
    testCode:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TData>
) {

    const params = req.query as TParam

    const getJawabanBenar = await prisma.test.findUnique({
        where:{
            testCode: params.testCode,

        },
       select:{
           soalOnTest:{
               select:{
                   Jawaban:{
                       where:{
                           status:true
                       },
                       select:{
                           status:true
                       }
                       
                   }
               }
           }
       }

    })

    const getJawabanSalah = await prisma.test.findUnique({
        where:{
            testCode: params.testCode,

        },
       select:{
           soalOnTest:{
               select:{
                   Jawaban:{
                       where:{
                           status:false
                       },
                       select:{
                           status:true
                       }
                       
                   }
               }
           }
       }

    })

    const jumlahBenarPerColumn = await prisma.$queryRaw`SELECT s.question as 'soal' ,count(j.status) as 'totalJawaban' from  Soal s 
                                        join SoalOnTest sot on s.id =sot.id 
                                        join Test t on sot.testId = t.id 
                                        left join Jawaban j on j.soalOnTestId = sot.id and j.status = true
                                        where t.testCode = 'q24hd1mlquf' 
                                        group by s.id;`;

    const jumlahSalahPerColumn = await prisma.$queryRaw`SELECT s.question as 'soal' ,count(j.status) as 'totalJawaban' from  Soal s 
                                join SoalOnTest sot on s.id =sot.id 
                                join Test t on sot.testId = t.id 
                                left join Jawaban j on j.soalOnTestId = sot.id and j.status = false
                                where t.testCode = 'q24hd1mlquf' 
                                group by s.id;`                                        
    

 
    const jumlahBenar = getJawabanBenar?.soalOnTest.map(item =>item.Jawaban.length)
    const jumlahSalah = getJawabanSalah?.soalOnTest.map(item =>item.Jawaban.length)

    const getTotalDikerjakan = await prisma.test.findUnique({
        where:{
            testCode: params.testCode,

        },
       select:{
           soalOnTest:{
               select:{
                   Jawaban:{
                       where:{
                           status:{
                               not:null
                           },
                       },
                       select:{
                           answers:true
                       }

                   }
               }
           }
       }

    })

    const jumlahDikerjakan = getTotalDikerjakan?.soalOnTest.map(item =>item.Jawaban.length)
  
  res.status(200).json({
      data:{
          sumCorrect:jumlahBenar?.reduce((a,b)=>a+b)as number,
          sumWrong:jumlahSalah?.reduce((a,b)=>a+b)as number,
          correctPerColumn:jumlahBenarPerColumn as TCorrectPerColumn[],
          wrongPerColumn:jumlahSalahPerColumn as TWrongPerColumn[],
          totalDikerjakan:jumlahDikerjakan?.reduce((a,b)=>a+b)as number,
          diver:0
      },
      message:'sukses'
  })

// res.status(200).json(totalDikerjakan)
}
