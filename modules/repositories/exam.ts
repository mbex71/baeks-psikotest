import {StatusTest} from '@modules/entities/exam'
import {IUserExam, TPostSubmitJawaban} from '@modules/dto/exam'
import fetcher from '@configs/fetcher'


type TParam = {
  status:StatusTest
}

const examList = async (params:TParam):Promise<IUserExam[]> =>{
    
  const res = await fetcher({
      method:'GET',
      url:'/exam',
      params: params
  })

  return res.data
}

const createExam = async (testId:string):Promise<IUserExam> =>{
    const res = await fetcher({
      method:'POST',
      url:'/exam/create',
      data:{
        testId
      }
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


export{
    examList,
    createExam,
    fetchUserExam,
     submitJawaban
}