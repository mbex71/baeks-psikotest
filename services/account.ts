import prisma from "@configs/prisma";
import {TCreateUserAccount} from '@modules/dto/account'
import {IUser} from '@modules/entities/user'



const selectAllUserAccount = async () => {
    
    const data = await prisma.account.findMany({
        
        select:{
            name:true,
            password:true,
            type:true,
            tglLahir:true,
            username:true,
            id:true
        },
        
    })

    return data
}

const createUserAccount = async (data: TCreateUserAccount):Promise<any> => {

    const listSoal = await prisma.soal.findMany({
        select:{
            id:true,
        }
    })

    const timer = await prisma.timer.findFirst({
        select:{
            value:true
        }
    })

    const account = await prisma.account.create({
        data: {
            username:Math.random().toString(36).substring(7),
            password: Math.random().toString(36).substring(7),
            name: data.name,
            tglLahir: new Date(data.tglLahir),
            type:'USER',
            Test:{
                create:{
                    tujuan: data.tujuan,
                    testCode: Math.random().toString(36).substring(2),
                    status:'ACTIVE',
                    registrationDate: new Date(Date.now()),
                    soalOnTest:{
                        createMany:{
                            data:listSoal.map(soal => ({soalId: soal.id, timer: timer?.value}))
                        },  
                        
                    },
                    
                },
                
            }
        },
        select:{
            username:true,
            name:true,
            password:true,
            tglLahir:true,
            id :true,
            type:true,
            Test:{
                where:{
                    status:'ACTIVE'
                },
                select:{
                    accountId:true,
                    status:true,
                    soalOnTest:{
                        select:{
                            id:true,
                            Soal:{
                                select:{
                                    Options:{
                                        select:{
                                            id:true,
                                            question:true,
                                            correctAnswer:true,
                                        }
                                    }
                                }
                            },
                            Jawaban:true
                        }
                    }
                }
            }
        }
       
    })


    const createJawaban = await prisma.$executeRaw`INSERT  into Jawaban (soalOnTestId, optionsId)
    select sot.id , o.id
    from Account a 
    join Test t on t.accountId = a.id
    join SoalOnTest sot on sot.testId = t.id 
    join Soal s on s.id = sot.soalId 
    join Options o on o.soalId = s.id
    left JOIN  Jawaban j on j.optionsId = o.id 
    where a.id = ${account.id};`
    
    
    const test = await prisma.account.findUnique({
        where:{
            id: account.id
        },
        include:{
            Test:{
                include:{
                    soalOnTest:{
                        include:{
                            Soal:{
                                include:{
                                    Options:true
                                }
                            },
                            Jawaban:true
                        },
                        
                    }
                }
            }
        }
    })

    return test
}


type TParamDetail = {
    id:number
}

const accountDetail = async (data:TParamDetail) =>{

    const detail = await prisma.account.findUnique({
        where:{
            id: data.id,
        },
        select:{
            name:true,
            tglLahir:true,
            username:true,
            type:true,
            password:true
        }
    })

    return detail
}

export{
    createUserAccount,
    selectAllUserAccount,
    accountDetail
}