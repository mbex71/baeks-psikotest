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

const createUserAccount = async (data: TCreateUserAccount):Promise<IUser> => {

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
        }
       
    })

    return account
}


export{
    createUserAccount,
    selectAllUserAccount
}