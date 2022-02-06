import { IAccount, TCreateUserAccount, TParamDetailAccount } from '@modules/dto/account'
import { IUserExam } from '@modules/dto/exam'
import {StatusTest} from '@modules/entities/exam'
import { IUser } from '@modules/entities/user'
import { accountList, detailAccount} from '@modules/repositories/dashboard/accounts'
import {UseQueryResult, useQuery, UseMutationResult, useMutation} from 'react-query'
import {createAccount} from '@modules/repositories/dashboard/accounts'
import { updateTimer, getTimer } from '@modules/repositories/dashboard/setting'

type TParamUpdateTimer = {
    timer:number
}

type TDataTimer = {
    timer:number
}

const useGetTimer = ():UseQueryResult<TDataTimer, Error> =>{
    return useQuery('getTimer', getTimer);
}

const useUpdateTimer = ():UseMutationResult<unknown, Error, TParamUpdateTimer> =>{
    return useMutation((param:TParamUpdateTimer) => updateTimer(param));
}



export{
    useGetTimer,
    useUpdateTimer
    
}