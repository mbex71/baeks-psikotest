import { PrismaClient, Prisma} from '@prisma/client'
import {seedUser , seedTypeSoal, seedTimer, seedSoal} from '../databases/seeders/dev'

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
        data:[
            {
                question:'9267',
                correctAnswer:'e',
                wrongAnswer:'abcd',
                soalId:1
            },
            {
                question:'4976',
                correctAnswer:'c',
                wrongAnswer:'abde',
                soalId:1,
            },
            {
                question:'9267',
                correctAnswer:'e',
                wrongAnswer:'abcd',
                soalId:1,
            },
            {
                question:'7642',
                correctAnswer:'a',
                wrongAnswer:'bcde',
                soalId:1,
            },
            {
                question:'4796',
                correctAnswer:'c',
                wrongAnswer:'abde',
                soalId:1,
            },
            {
                question:'4926',
                correctAnswer:'b',
                wrongAnswer:'acde',
                soalId:1,
            },
            {
                question:'2769',
                correctAnswer:'e',
                wrongAnswer:'abcd',
                soalId:1,
            },
            {
                question:'7426',
                correctAnswer:'a',
                wrongAnswer:'bcde',
                soalId:1,
            },
            {
                question:'2794',
                correctAnswer:'d',
                wrongAnswer:'abce',
                soalId:1,
            },
            {
                question:'4276',
                correctAnswer:'a',
                wrongAnswer:'bcde',
                soalId:1,
            },
            {
                question:'0813',
                correctAnswer:'c',
                wrongAnswer:'abde',
                soalId:2,
            },
            {
                question:'3015',
                correctAnswer:'d',
                wrongAnswer:'abce',
                soalId:2,
            }
        ],
        skipDuplicates: true
    })

    
}


main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async()=> await prisma.$disconnect())