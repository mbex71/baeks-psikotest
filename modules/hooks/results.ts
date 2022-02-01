import { IUserExam, TPostSubmitJawaban } from '@modules/dto/exam'
import {ITest, StatusTest} from '@modules/entities/exam'
import {TParam, TResults} from '@modules/entities/results'
import {examResultDetails, examResultList} from '@modules/repositories/exam'
import {UseQueryResult, useQuery, UseMutationResult, useMutation} from 'react-query'



const useExamResultDetails = (params:TParam):UseQueryResult<TResults, Error> =>{
    return useQuery(['resultDetails',params], () => examResultDetails(params),{
        enabled: !!params.testCode
    })
}

type TResResultList = {
    id:3,
    name:string
    username:string
    tglLahir:string
    type:string
    createdAt:string
    updatedAt:string
    Test:ITest[]
}

const useExamResultList = ():UseQueryResult<TResResultList, Error> =>{
    return useQuery('results', examResultList)
}


export{
    useExamResultDetails,
    useExamResultList
}