import {StatusTest} from '@modules/entities/exam'
import prisma from '@configs/prisma'

const listUserExams = async (userId: number | undefined, status:StatusTest ) => {
    const data = await prisma.test.findMany({
        where: {
            userId: userId,
            status:status
        },
        include:{
            User:true,
            
        }
    })
    await prisma.$disconnect()

    return data
}

const userExam = async (userId:number,testId:string, soalId:number) =>{
    const data = await prisma.test.findFirst({
        where: {
            userId: userId,
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



export {
    listUserExams,
    userExam
     
}