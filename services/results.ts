import prisma from "@configs/prisma";
import {TCorrectPerColumn, TResults,TWrongPerColumn,TParam } from '@modules/entities/results'

const resultExam = async (params:TParam):Promise<TResults> =>{
  


    const jumlahBenar:any = await prisma.$queryRaw`select count(j.answers) as 'total_benar'
    from Test t 
    join SoalOnTest sot on sot.testId = t.id 
    join Jawaban j on j.soalOnTestId = sot.id 
    join Options o on o.id = j.optionsId 
    WHERE  t.testCode = ${params.testCode} and j.answers = o.correctAnswer;`

    const jumlahSalah:any = await prisma.$queryRaw`select count(j.answers) as 'total_salah'
    from Test t 
    join SoalOnTest sot on sot.testId = t.id 
    join Jawaban j on j.soalOnTestId = sot.id 
    join Options o on o.id = j.optionsId 
    WHERE  t.testCode = ${params.testCode} and j.answers != o.correctAnswer;`

    const jumlahDikerjakan:any = await prisma.$queryRaw`select count(j.answers) as 'totalJawaban' from SoalOnTest sot 
    join Test t on t.id = sot .testId 
    join Soal s on s.id = sot.soalId 
    left join Jawaban j on j.soalOnTestId  = sot.id and j.answers is not null
    where t.testCode = ${params.testCode};`

    const jumlahBenarPerColumn = await prisma.$queryRaw`select o.soalId ,count(j.answers) as 'totalJawaban'
    from Test t 
    join SoalOnTest sot on sot.testId = t.id 
    join Jawaban j on j.soalOnTestId = sot.id 
    join Options o on o.id = j.optionsId 
    WHERE  t.testCode = ${params.testCode} and j.answers = o.correctAnswer group by o.soalId;` 


    const jumlahSalahPerColumn = await prisma.$queryRaw`select o.soalId,count(j.answers) as 'totalJawaban'
    from Test t 
    join SoalOnTest sot on sot.testId = t.id 
    join Jawaban j on j.soalOnTestId = sot.id 
    join Options o on o.id = j.optionsId 
    WHERE  t.testCode = ${params.testCode} and j.answers != o.correctAnswer group by o.soalId;` 

const totalJawabPerColumn = await prisma.$queryRaw`select sot.soalId  ,count(j.answers) as 'totalJawaban' from SoalOnTest sot 
    join Test t on t.id = sot .testId 
    join Soal s on s.id = sot.soalId 
    left join Jawaban j on j.soalOnTestId  = sot.id and j.answers is not null
    where t.testCode = ${params.testCode} 
    GROUP by sot.soalId;`                

const devariasi:any = await prisma.$queryRaw`select (MAX(totalJawab) - MIN(totalJawab)) as 'Devariasi' 
from (select COUNT(j.answers) as 'totalJawab'  from Jawaban j 
join Options o on o.id = j.optionsId 
join SoalOnTest sot on sot.id = j.soalOnTestId 
join Test t on t.id = sot.testId 
where t.testCode = ${params.testCode}
GROUP by o.soalId 
) devariasi;`

    
    
    const data ={
        
        sumCorrect:jumlahBenar?.[0].total_benar as number, // done
        sumWrong:jumlahSalah?.[0].total_salah as number, //done
        correctPerColumn:jumlahBenarPerColumn as TCorrectPerColumn[], // done
        wrongPerColumn:jumlahSalahPerColumn as TWrongPerColumn[], // done
        totalJawabPerColumn:totalJawabPerColumn as TCorrectPerColumn[], // done
        totalDikerjakan:jumlahDikerjakan?.[0].totalJawaban as number, // done
        devariasi:devariasi?.[0]?.Devariasi as number
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