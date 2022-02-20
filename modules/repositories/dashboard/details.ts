import fetcher from '@configs/fetcher'
import { TResTotalPeserta, TResTotalUjian } from '@modules/entities/dashboard'
import { AxiosResponse } from 'axios'

const fetchTotalPeserta = async ():Promise<AxiosResponse<TResTotalPeserta>> =>{
    const res = await fetcher({
        method:'GET',
        url:`dashboard/details/totalPeserta`,
    })
    return res.data
}

const fetchTotalUjian = async ():Promise<AxiosResponse<TResTotalUjian>> =>{
    const res = await fetcher({
        method:'GET',
        url:`dashboard/details/totalUjian`,
    })
    return res.data
}





export {
    fetchTotalPeserta,
    fetchTotalUjian
}