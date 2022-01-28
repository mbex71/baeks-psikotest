import {StatusTest} from '@modules/entities/exam'
import {IUserExam} from '@modules/dto/exam'
import fetcher from '@configs/fetcher'
import { IUser } from '@modules/entities/user'


const accountList = async ():Promise<IUser[]> =>{
    
  const res = await fetcher({
      method:'GET',
      url:'/dashboard/accounts',
      
  })

  return res.data?.data
}


export{
    accountList,
    
}