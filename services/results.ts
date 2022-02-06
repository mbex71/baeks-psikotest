import prisma from "@configs/prisma";
import {TCorrectPerColumn, TResults,TWrongPerColumn,TParam } from '@modules/entities/results'

const resultExam = async (params:TParam):Promise<TResults> =>{
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

    const jumlahBenarPerColumn = await prisma.$queryRaw`select sot.soalId ,count(j.answers) as 'totalJawaban' from SoalOnTest sot 
                                    join Test t on t.id = sot .testId 
                                    join Soal s on s.id = sot.soalId 
                                    left join Jawaban j on j.soalOnTestId  = sot.id and j.status =true
                                    where t.testCode = ${params.testCode}
                                    GROUP by sot.soalId;` 
    const jumlahSalahPerColumn = await prisma.$queryRaw`select sot.soalId ,count(j.answers) as 'totalJawaban' from SoalOnTest sot 
                                    join Test t on t.id = sot .testId 
                                    join Soal s on s.id = sot.soalId 
                                    left join Jawaban j on j.soalOnTestId  = sot.id and j.status =false
                                    where t.testCode = ${params.testCode}
                                    GROUP by sot.soalId;`         
    
    const totalJawabPerColumn = await prisma.$queryRaw`select sot.soalId  ,count(*) as 'totalJawaban' from SoalOnTest sot 
                                join Test t on t.id = sot .testId 
                                join Soal s on s.id = sot.soalId 
                                left join Jawaban j on j.soalOnTestId  = sot.id and j.answers is not null
                                where t.testCode = 'xd7ubttmyg' 
                                GROUP by sot.soalId;`                
    
    const devariasi:any = await prisma.$queryRaw`select (MAX(totalJawaban) - MIN(totalJawaban)) as 'devariasi' from (select sot.soalId as 'Soal ID' ,count(*) as 'totalJawaban' from SoalOnTest sot 
                                join Test t on t.id = sot .testId 
                                join Soal s on s.id = sot.soalId 
                                left join Jawaban j on j.soalOnTestId  = sot.id and j.answers is not null
                                where t.testCode = 'xd7ubttmyg' 
                                GROUP by sot.soalId) terjawab ;`

 
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

    
    const data ={
        sumCorrect:jumlahBenar?.reduce((a,b)=>a+b)as number,
        sumWrong:jumlahSalah?.reduce((a,b)=>a+b)as number,
        correctPerColumn:jumlahBenarPerColumn as TCorrectPerColumn[],
        wrongPerColumn:jumlahSalahPerColumn as TWrongPerColumn[],
        totalJawabPerColumn:totalJawabPerColumn as TCorrectPerColumn[],
        totalDikerjakan:jumlahDikerjakan?.reduce((a,b)=>a+b)as number,
        devariasi:devariasi?.[0]?.devariasi as number
    }
     

    return data
}


type TParamListResult = {
    username:string
}

const resultListExam = async (params:TParamListResult) =>{
    const data = await prisma.account.findUnique({
        where:{
            username:params.username
        },
        include:{
            Test:true
        }
    })

    return data
}


// Dashboard

const resultListDashboard = async () =>{
    const data = await prisma.test.findMany({
        select:{
            testCode:true,
            tujuan:true,
            registrationDate:true,
            status:true,
            Account:true
        }
    })

    return data
}

type TParamsDetailResultDashboard = {
    testCode:string
}

const resultDetalDashboard = async ({testCode}:TParamsDetailResultDashboard) =>{
    const account = await prisma.test.findUnique({
        where:{
            testCode: testCode
        },
        select:{
            registrationDate:true,
            tujuan:true,
            Account:true
        }
    })

    
    const getResult = await resultExam({testCode})

    return {
         ...getResult, ...account
    }

}


export{
    resultExam,
     resultListExam,
      resultListDashboard,
      resultDetalDashboard
}