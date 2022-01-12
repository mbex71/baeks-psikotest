import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    
    const user = await prisma.user.createMany({
        data: [
            {name:'John Doe'},
            {name:'Jane Doe'},
            {name:'Jack Doe'},
        ]
    })
}


main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async()=> await prisma.$disconnect())