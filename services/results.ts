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

    // const jumlahBenarPerColumn = await prisma.$queryRaw`SELECT s.id,s.question as 'soal' ,count(j.status) as 'totalJawaban' from  Soal s 
    //                                     join SoalOnTest sot on s.id =sot.id 
    //                                     join Test t on sot.testId = t.id 
    //                                     left join Jawaban j on j.soalOnTestId = sot.id and j.status = true
    //                                     where t.testCode = ${params.testCode}
    //                                     group by s.id;`;

    // const jumlahSalahPerColumn = await prisma.$queryRaw`SELECT s.id,s.question as 'soal' ,count(j.status) as 'totalJawaban' from  Soal s 
    //                             join SoalOnTest sot on s.id =sot.id 
    //                             join Test t on sot.testId = t.id 
    //                             left join Jawaban j on j.soalOnTestId = sot.id and j.status = false
    //                             where t.testCode = ${params.testCode}
    //                             group by s.id;`    

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
        totalDikerjakan:jumlahDikerjakan?.reduce((a,b)=>a+b)as number,
        diver:0
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



export{
    resultExam,
     resultListExam
}