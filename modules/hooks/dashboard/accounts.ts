import { IUserExam } from '@modules/dto/exam'
import {StatusTest} from '@modules/entities/exam'
import { IUser } from '@modules/entities/user'
import { accountList} from '@modules/repositories/dashboard/accounts'
import {UseQueryResult, useQuery, UseMutationResult, useMutation} from 'react-query'



const useAccountList = ():UseQueryResult<IUser[], Error> =>{
    return useQuery('accountList', accountList);
}




export{
    useAccountList
}