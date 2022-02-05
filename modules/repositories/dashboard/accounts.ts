import fetcher from '@configs/fetcher'
import { IUser } from '@modules/entities/user'
import { IAccount, TCreateUserAccount, TParamDetailAccount } from '@modules/dto/account'


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

const detailAccount = async (params:TParamDetailAccount):Promise<IAccount> =>{
    const res = await fetcher({
        method:'GET',
        url:`/dashboard/accounts/${params.username}`,
    })

    return res.data
}


export{
    accountList,
    createAccount,
    detailAccount
    
}