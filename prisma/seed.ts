import { PrismaClient, Prisma} from '@prisma/client'
import {seedUser , seedTypeSoal, seedTimer, seedSoal, seedOptions} from '../databases/seeders/dev'

const prisma = new PrismaClient()

const main = async () => {
   const user = await prisma.account.createMany({
       data:seedUser as Prisma.Enumerable<Prisma.AccountCreateManyInput>,
   })

   const timer = await prisma.timer.create({
       data:seedTimer as Prisma.TimerCreateInput,
   })


    const typeSoal = await prisma.typeSoal.createMany({
        data: seedTypeSoal as Prisma.Enumerable<Prisma.TypeSoalCreateManyInput>,
        skipDuplicates: true,

    })

    const soal = await prisma.soal.createMany({
        data:seedSoal as Prisma.Enumerable<Prisma.SoalCreateManyInput>,
        skipDuplicates:true
    })

    const options = await prisma.options.createMany({
        data:seedOptions as Prisma.Enumerable<Prisma.OptionsCreateManyInput>,
        skipDuplicates: true
    })

    
}


main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async()=> await prisma.$disconnect())