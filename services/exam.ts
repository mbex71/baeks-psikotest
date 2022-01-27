import {StatusTest} from '@modules/entities/exam'
import prisma from '@configs/prisma'

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

const userExam = async (userId:number,testId:string, soalId:number) =>{
    const data = await prisma.test.findFirst({
        where: {
            accountId: userId,
            id:testId
        },
        select:{
            status:true,
            tujuan:true,
            registrationDate:true,
            User:{
                select:{
                    name:true,
                    tglLahir:true,
                    username:true
                }
            },
            soalOnTest:{
                
                where:{
                    testId:testId,
                    soalId:soalId
                },
                select:{
                    time:true,
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

    return data
}

const createTest = async (userId:number) =>{
    const idSoal = await prisma.soal.findMany({
        select:{
            id:true
        }
    })

    const timer = await prisma.timer.findFirst({
        select:{
            value:true
        }
    })

    const test = await prisma.test.create({
        
        data:{
            testCode:Math.random().toString(36).substring(2, 15),
            registrationDate:new Date(),
            tujuan:'Tes Test',
            accountId:userId,
            soalOnTest:{
                create:idSoal.map(item=>{
                    return{
                        soalId:item.id,
                        time:timer?.value   
                    }
                }),
                
            }  

        },
        include:{
            soalOnTest:true,
            Account:true
        }
    })

    console.log('TEST Create REsult: ', test)

    return test
}


export {
    listUserExams,
    userExam,
    createTest
     
}