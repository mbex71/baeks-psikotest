
import { IUserExam } from '@modules/dto/exam';
import {IResultsDetailDashboard} from '@modules/entities/results'
import {  fetchResultList, fetchResultDetails} from '@modules/repositories/dashboard/results'
import {UseQueryResult, useQuery, UseMutationResult, useMutation} from 'react-query'

const useResultList = ():UseQueryResult<IUserExam[], Error> =>{
    return useQuery<IUserExam[], Error>('resultList', fetchResultList);
}

type TParamsDetailResult = {
    testCode:string
  }
  

const useResultDetail = (params:TParamsDetailResult):UseQueryResult<IResultsDetailDashboard, Error> =>{
    return useQuery<IResultsDetailDashboard, Error>(['resultList', params], () =>fetchResultDetails(params),{
        enabled:!!params.testCode
    });
}

export{
    useResultList,
    useResultDetail
}