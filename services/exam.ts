import {StatusTest} from '@modules/entities/exam'
import prisma from '@configs/prisma'
import {TParamCreateTest, TPostSubmitJawaban} from '@modules/dto/exam'
import { TParamDetailAccount } from '@modules/dto/account'

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
    await prisma.$disconnect()

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

    const optionsLength = await prisma.options.count({
        where:{
            soalId:soalId
        }
    })
    

    

    return {...data, testLength : soalOnTestLength, optionsLength:optionsLength}
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

    // const account = await prisma.account.update({
    //     where:{
    //         username:username
    //     },
    //     data:{
    //         Test:{
    //             create:{
    //                 testCode:Math.random().toString(36).substring(2, 15),
    //                 registrationDate:new Date(),
    //                 tujuan:tujuan,
    //                 soalOnTest:{
    //                     create: idSoal.map(item =>({soalId: item.id, timer:timer?.value}))
    //                 }
    //             },
                
                
    //         },
            
    //     }
    // })

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

   

    console.log('Test: ', createTest)

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


const submitJawaban = async (params:TPostSubmitJawaban):Promise<any> =>{

   const soalOnTest = await prisma.soalOnTest.findFirst({
        where:{
            Test:{
                testCode: params.testCode
            },
            soalId:params.soaldId,
            
            
        },
        include:{
            Soal:{
                include:{
                    Options:{
                        where:{
                            id:params.optionId
                        }
                    }
                }
            },
            Jawaban:{
                where:{
                    optionsId:params.optionId
                },
                
            }
        }
   })


   const submitJawaban = await prisma.test.update({
       where:{
           testCode: params.testCode
       },
       data:{
           soalOnTest:{
               update:{
                   where:{
                       id:soalOnTest?.id
                   },
                   data:{
                       Jawaban:{
                            update:{
                                where:{
                                    id:soalOnTest?.Jawaban?.[0].id
                                },
                                data:{
                                    answers:params.answer,
                                    status: soalOnTest?.Soal?.Options.find(item => item.id === params.optionId)?.correctAnswer === params.answer ? true : false
                                }
                            }
                       }
                   }
               }
           }
       }
   })

   const checkData = await prisma.soalOnTest.findFirst({
    where:{
        Test:{
            testCode: params.testCode
        },
        soalId:params.soaldId,
        
        
    },
    include:{
        Soal:{
            include:{
                Options:{
                    where:{
                        id:params.optionId
                    }
                }
            }
        },
        Jawaban:{
            where:{
                optionsId:params.optionId
            },
            
        }
    }
})

  

    return checkData
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