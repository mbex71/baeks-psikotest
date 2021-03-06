import { IAccount, TCreateUserAccount, TParamDetailAccount } from '@modules/dto/account'
import { IUserExam } from '@modules/dto/exam'
import {StatusTest} from '@modules/entities/exam'
import { IUser } from '@modules/entities/user'
import { accountList, detailAccount} from '@modules/repositories/dashboard/accounts'
import {UseQueryResult, useQuery, UseMutationResult, useMutation} from 'react-query'
import {createAccount} from '@modules/repositories/dashboard/accounts'


const useAccountList = ():UseQueryResult<IUser[], Error> =>{
    return useQuery('accountList', accountList);
}

const useCreateAccount = ():UseMutationResult<IUser, Error, TCreateUserAccount> =>{
    return useMutation((param) => createAccount(param));
}

const useAccountDetail = (params:TParamDetailAccount):UseQueryResult<IAccount, Error> =>{
    return useQuery(['detailAccount', params], () => detailAccount({username: params.username}));
}

export{
    useAccountList,
    useCreateAccount,
    useAccountDetail
}