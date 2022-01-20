import {IExam} from '@modules/entities/exam'
import fetcher from '@configs/fetcher'
import {getSession} from 'next-auth/react'

const examList = async ():Promise<IExam[]> =>{
    
  const res = await fetcher({
      method:'GET',
      url:'/exam',
  })

  
  return res.data
}



export{
    examList
}