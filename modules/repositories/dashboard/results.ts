import fetcher from '@configs/fetcher'
import { IUser } from '@modules/entities/user'
import { IAccount, TCreateUserAccount, TParamDetailAccount } from '@modules/dto/account'
import { IUserExam } from '@modules/dto/exam'
import { IResultsDetailDashboard } from '@modules/entities/results'


const fetchResultList = async ():Promise<IUserExam[]> =>{
    
  const res = await fetcher({
      method:'GET',
      url:'/dashboard/results',
      
  })

  return res.data?.data
}

type TParamsDetailResult = {
  testCode:string
}

const fetchResultDetails = async (params:TParamsDetailResult):Promise<IResultsDetailDashboard> =>{
    
  const res = await fetcher({
      method:'GET',
      url:`/dashboard/results/${params.testCode}`,
      
  })

  return res.data?.data
}




export{
    fetchResultList,
    fetchResultDetails
  
    
}