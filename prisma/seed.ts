import prisma from '@configs/prisma'

const main = async () => {
    
    const user = await prisma.user.createMany({
        data: [
            {name:'Admin',username:'Admin',password:'Rahasia123!',type:'ADMIN', tglLahir: new Date('1996-01-01')},
            {name:'Firdaus',username:'firdaus71',password:'Rahasia123!',type:'USER', tglLahir: new Date('1996-01-01')},
        ],
        skipDuplicates: true,

    })

    const test = await prisma.test.createMany({
        data:[
            {
                userId:2,
                tujuan:'Tes PNS',
                status:'ACTIVE'

            }
        ],
        skipDuplicates:true
    })

    const typeSoal = await prisma.typeSoal.createMany({
        data: [
            {
                name:'ANGKA'
            },
            {
                name:'HURUF'
            },
            {
                name:'SYMBOL'
            }
        ],
        skipDuplicates: true,

    })

    const soal = await prisma.soal.createMany({
        data:[
            {
                question:'9,7,2,6,4',
                listOfChoise:'a,b,c,d,e',
                typeSoalId:1
            },
            {
                question:'3,0,5,8,1',
                listOfChoise:'a,b,c,d,e',
                typeSoalId:1
            }
        ],
        skipDuplicates:true
    })

    const options = await prisma.options.createMany({
        data:[
            {
                question:'9,2,6,7',
                correctAnswer:'e',
                wrongAnswer:'a,b,c,d',
                soalId:1
            },
            {
                question:'3,0,5,8',
                correctAnswer:'c',
                wrongAnswer:'a,b,d,e',
                soalId:1
            },
            {
                question:'9,2,6,7',
                correctAnswer:'e',
                wrongAnswer:'a,b,c,d',
                soalId:1
            },
            {
                question:'7,6,4,2',
                correctAnswer:'a',
                wrongAnswer:'b,c,d,e',
                soalId:1
            },
            {
                question:'4,7,9,6',
                correctAnswer:'c',
                wrongAnswer:'a,b,d,e',
                soalId:1
            },
            {
                question:'4,9,2,6',
                correctAnswer:'b',
                wrongAnswer:'a,c,d,e',
                soalId:1
            },
            {
                question:'2,7,6,9',
                correctAnswer:'e',
                wrongAnswer:'a,b,c,d',
                soalId:1
            },
            {
                question:'7,4,2,6',
                correctAnswer:'a',
                wrongAnswer:'b,c,d,e',
                soalId:1
            },
            {
                question:'2,7,9,4',
                correctAnswer:'d',
                wrongAnswer:'a,b,c,e',
                soalId:1
            },
            {
                question:'4,2,7,6',
                correctAnswer:'a',
                wrongAnswer:'b,c,d,e',
                soalId:1
            }
        ],
        skipDuplicates: true
    })
}


main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async()=> await prisma.$disconnect())