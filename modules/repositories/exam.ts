import {StatusTest} from '@modules/entities/exam'
import {IUserExam, TParamCreateTest, TPostSubmitJawaban, } from '@modules/dto/exam'
import fetcher from '@configs/fetcher'
import {TResults} from '@modules/entities/results'
import { TParamDetailAccount } from '@modules/dto/account'


type TParam = {
  status:StatusTest,
  testCode:string
}

const examList = async (params:TParam):Promise<IUserExam[]> =>{
    
  const res = await fetcher({
      method:'GET',
      url:'/exam',
      params: params
  })

  return res.data
}

const startExam = async (params:TParam):Promise<void> =>{
  const res = await fetcher({
    method:'POST',
    url:'/exam/start',
    data:params
  })

  return res.data
}

const createExam = async (params:TParamCreateTest):Promise<IUserExam> =>{
    const res = await fetcher({
      method:'POST',
      url:'/exam/create',
      data:params
    })

    return res.data
}

type TParamExam = {
  testId:string,
  soalId:number
}

const fetchUserExam = async ({testId, soalId}:TParamExam):Promise<IUserExam> =>{
  const res = await fetcher({
    method:'GET',
    url:`/exam/${testId}/${soalId}`,
    data:{
      testId
    }
  })

  return res.data
}


const submitJawaban = async (data:TPostSubmitJawaban):Promise<IUserExam> =>{
  const res = await fetcher({
    method:'POST',
    url:'/exam/submit',
    data:data
  })

  return res.data
}

type TParamsResult = {
  testCode:string
}

const examResultDetails = async (params:TParamsResult):Promise<TResults> =>{
  const res = await fetcher({
    method:'GET',
    url:`/results/${params.testCode}`,
    
  })

  return res.data
}

const examResultList = async ():Promise<TResults> =>{
  const res = await fetcher({
    method:'GET',
    url:`/results`,
    
  })

  return res.data
}



export{
    examList,
    createExam,
    fetchUserExam,
     submitJawaban,
     examResultDetails,
     examResultList,
     startExam
}