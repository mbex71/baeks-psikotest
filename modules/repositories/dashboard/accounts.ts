import {StatusTest} from '@modules/entities/exam'
import {IUserExam} from '@modules/dto/exam'
import fetcher from '@configs/fetcher'
import { IUser } from '@modules/entities/user'
import { TCreateUserAccount } from '@modules/dto/account'


const accountList = async ():Promise<IUser[]> =>{
    
  const res = await fetcher({
      method:'GET',
      url:'/dashboard/accounts',
      
  })

  return res.data?.data
}

const createAccount = async (data: TCreateUserAccount):Promise<IUser> =>{
      
    const res = await fetcher({
        method:'POST',
        url:'/dashboard/accounts/create',
        data:data
    })
  
    return res.data?.data
}


export{
    accountList,
    createAccount
    
}