import { TParamDetailAccount } from '@modules/dto/account'
import { IUserExam, TParamCreateTest, TPostSubmitJawaban } from '@modules/dto/exam'
import {StatusTest} from '@modules/entities/exam'
import { examList , createExam, fetchUserExam, submitJawaban, startExam} from '@modules/repositories/exam'
import {UseQueryResult, useQuery, UseMutationResult, useMutation} from 'react-query'


type TparamsList= {
    status:StatusTest
}
type TParams = {
    status:StatusTest
    testCode:string
  }

const useExamList = (params:TparamsList):UseQueryResult<IUserExam[], Error> =>{
    return useQuery(['examList',params], () => examList(params),{
        enabled: !!params.status
    })
}

const useStartExam = ():UseMutationResult<unknown,Error,TParams, unknown> =>{
    return useMutation((params:TParams) => startExam(params))
}


const useCreateExam = ():UseMutationResult<unknown,Error,TParamCreateTest, unknown> =>{
    return useMutation((params:TParamCreateTest) => createExam(params))
}

type TParamExam = {
    testId:string,
    soalId:number
}
const useUserExam = (params:TParamExam):UseQueryResult<IUserExam, Error> =>{
    return useQuery(['examUser', params], ()=>fetchUserExam(params),{
        enabled:!!params.soalId && !!params.testId
    })
}


const useSubmitJawaban = ():UseMutationResult<unknown,Error,TPostSubmitJawaban, unknown> =>{
    return useMutation((params:TPostSubmitJawaban) => submitJawaban(params))
}
export{
    useExamList,
    useCreateExam,
    useUserExam,
    useSubmitJawaban,
    useStartExam
}