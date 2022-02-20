import { TResTotalPeserta, TResTotalUjian } from '@modules/entities/dashboard'
import {fetchTotalPeserta, fetchTotalUjian} from '@modules/repositories/dashboard/details'
import { useQuery, UseQueryResult } from 'react-query'


const useTotalPeserta = ():UseQueryResult<TResTotalPeserta, Error> =>{
    return useQuery('totalPeserta',fetchTotalPeserta)
}
const useTotalUjian = ():UseQueryResult<TResTotalUjian, Error> =>{
    return useQuery('totalUjian',fetchTotalUjian)
}


export{
    useTotalPeserta,
     useTotalUjian
}