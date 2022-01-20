import { IUserExam } from '@modules/dto/exam'
import { examList } from '@modules/repositories/exam'
import {UseQueryResult, useQuery} from 'react-query'

const useExamList = ():UseQueryResult<IUserExam[], Error> =>{
    return useQuery('examList', () => examList())
}


export{
    useExamList
}