import { IUserExam } from '@modules/dto/exam'
import {StatusTest} from '@modules/entities/exam'
import { examList , createExam, fetchUserExam} from '@modules/repositories/exam'
import {UseQueryResult, useQuery, UseMutationResult, useMutation} from 'react-query'

type TParams = {
    status:StatusTest
  }

const useExamList = (params:TParams):UseQueryResult<IUserExam[], Error> =>{
    return useQuery(['examList',params], () => examList(params),{
        enabled: !!params.status
    })
}


const useCreateExam = ():UseMutationResult<unknown,Error,string, unknown> =>{
    return useMutation((testId:string) => createExam(testId))
}

type TParamExam = {
    testId:string,
    soalId:number
}
const useUserExam = (params:TParamExam):UseQueryResult<IUserExam, Error> =>{
    return useQuery(['examUser', params], ()=>fetchUserExam(params))
}

export{
    useExamList,
    useCreateExam,
    useUserExam
}