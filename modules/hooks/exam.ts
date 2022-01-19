import { IExam } from '@modules/entities/exam'
import { examList } from '@modules/repositories/exam'
import {UseQueryResult, useQuery} from 'react-query'

const useExamList = ():UseQueryResult<IExam[], Error> =>{
    return useQuery('examList', () => examList())
}


export{
    useExamList
}