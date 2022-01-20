import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const listUserExams = async (userId: number | undefined ) => {
    const data = await prisma.test.findMany({
        where: {
            userId: userId
        },
        include:{
            User:true
        }
    })
    await prisma.$disconnect()

    return data
}


export {
    listUserExams
}