import {StatusTest} from '@modules/entities/exam'
import {IUserExam} from '@modules/dto/exam'
import fetcher from '@configs/fetcher'
import { IUser } from '@modules/entities/user'
import { IAccount, TCreateUserAccount, TParamDetailAccount } from '@modules/dto/account'

type TParamUpdateTimer = {
    timer:number
}

const getTimer = async ():Promise<IUser[]> =>{
    
  const res = await fetcher({
      method:'GET',
      url:'/dashboard/settings/timer',
      
  })

  return res.data
}

const updateTimer = async (data: TParamUpdateTimer):Promise<{timer:number}> =>{
      
    const res = await fetcher({
        method:'POST',
        url:'/dashboard/settings/timer',
        data:data
    })
  
    return res.data
}




export{
    getTimer,
    updateTimer
    
}