import {StatusTest} from '@modules/entities/exam'
import prisma from '@configs/prisma'
import {TParamCreateTest, TPostSubmitJawaban} from '@modules/dto/exam'
import type { Options } from '@prisma/client'


const listUserExams = async (userId: number | undefined, status:StatusTest ) => {
        const data = await prisma.test.findMany({
            where: {
                accountId: userId,
                status:status
            },
            include:{
                Account:true,
                
            }
        })

        return data
    
}

const userExam = async (accountId:number,testCode:string, soalId:number) =>{
    const data = await prisma.test.findFirst({
        where: {
            accountId: accountId,
            testCode: testCode
        },
        select:{
            status:true,
            tujuan:true,
            registrationDate:true,
            testCode:true,
            Account:{
                select:{
                    name:true,
                    tglLahir:true,
                    username:true
                }
            },
            soalOnTest:{                
                where:{
                    Test:{
                        testCode:testCode
                    },
                    soalId:soalId
                },
                select:{
                    id:true,
                    timer:true,
                    Soal:{
                        
                        select:{
                            
                            id:true,
                            question:true,
                            listOfChoise:true,
                            TypeSoal:{
                                select:{
                                    name:true
                                }
                            },
                            Options:{
                                select:{
                                    id:true,
                                    question:true,
                                    // correctAnswer:true,
                                    wrongAnswer:true,
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    const soalOnTestLength = await prisma.soalOnTest.count({
        where:{
            Test:{
                testCode:testCode
            }
        }
    })

    const optionsLength:any = await prisma.$queryRaw`select count(*) as optionsLength from Options where soalId = ${soalId}`

    return {...data, testLength : soalOnTestLength, optionsLength:optionsLength?.[0].optionsLength}
}


const createTest = async ({username, tujuan}:TParamCreateTest) =>{
    
    // Get All Soal ID
    const idSoal = await prisma.soal.findMany({
        select:{
            id:true
        }
    })
    
    // Get Timer Value
    const timer = await prisma.timer.findFirst({
        select:{
            value:true
        }
    })

    const account = await prisma.account.findUnique({
        where:{
            username:username
        },
        select:{
            id:true
        }
    })

    const createTest = await prisma.test.create({
        data:{
            testCode:Math.random().toString(36).substring(2, 15),
            registrationDate:new Date(),
            tujuan:tujuan,
            soalOnTest:{
                create: idSoal.map(item =>({soalId: item.id, timer:timer?.value}))
            },
            accountId: account?.id
        },
        
    })

   

    

    const createJawaban = await prisma.$executeRaw`INSERT  into Jawaban (soalOnTestId, optionsId)
    select sot.id , o.id
    from Account a 
    join Test t on t.accountId = a.id 
    join SoalOnTest sot on sot.testId = t.id 
    join Soal s on s.id = sot.soalId 
    join Options o on o.soalId = s.id
    left JOIN  Jawaban j on j.optionsId = o.id 
    where a.id = ${account?.id} and sot.testId = ${createTest?.id};`


    return createTest
}


const getOption = async (id:number):Promise<Options | null> => {
    const option = await prisma.options.findUnique({
        where:{
            id: id
        }
    })

    return option
}

const submitJawaban = async (params:TPostSubmitJawaban):Promise<any> =>{

    // const soalonTestID = params.jawaban[0].soalOnTestId
    // const answer = params.jawaban[0].answer
    // const optionsId = params.jawaban[0].optionId

    
    const data = params.jawaban.map(item =>({answers:item.answer, optionsId:item.optionId, soalOnTestId:item.soalOnTestId, status: false }))

   const insertjawaban = await prisma.jawaban.createMany({
       data:data,
       skipDuplicates:true,
   })


  
return insertjawaban
    
}


    type TParam = {
    status:StatusTest,
    testCode:string
  }

  const changeExamStatus = async (params:TParam) =>{
    const updateExamStatus = await prisma.test.update({
        where:{
            testCode:params.testCode
        },
        data:{
            status:params.status
        }
    })

    return updateExamStatus
  }

export {
    listUserExams,
    userExam,
    createTest,
    submitJawaban,
    changeExamStatus
     
}