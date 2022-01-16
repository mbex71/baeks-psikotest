import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    
    const user = await prisma.user.createMany({
        data: [
            {name:'Admin',username:'Admin',password:'Rahasia123!',type:'ADMIN', tglLahir: new Date('1996-01-01')},
        ]
    })
}


main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async()=> await prisma.$disconnect())