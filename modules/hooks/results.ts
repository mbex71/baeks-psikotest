import { IUserExam, TPostSubmitJawaban } from '@modules/dto/exam'
import {StatusTest} from '@modules/entities/exam'
import {TParam, TResults} from '@modules/entities/results'
import {examResultDetails} from '@modules/repositories/exam'
import {UseQueryResult, useQuery, UseMutationResult, useMutation} from 'react-query'



const useExamResultDetails = (params:TParam):UseQueryResult<TResults, Error> =>{
    return useQuery(['examList',params], () => examResultDetails(params),{
        enabled: !!params.testCode
    })
}



export{
    useExamResultDetails
}