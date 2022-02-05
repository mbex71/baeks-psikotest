import LineChart from "@components/charts/LineChart";
import { DashboardLayout, ExamLayout } from "@components/layouts";
import { NextPage } from "next";
import { TParam, TResults } from '@modules/entities/results'
import { useResultDetail } from '@modules/hooks/dashboard/results'
import { useRouter } from 'next/router'
import { format } from 'date-fns'

const DetailResult: NextPage = () => {
    const router = useRouter()

    const testCode = router.query.testCode as string

    const { data, isLoading } = useResultDetail({ testCode })

   
    return (
        <DashboardLayout>            
            <div className="px-12 my-12">
                <div className="flex flex-row text-lg font-bold">
                    <div className="w-1/4 flex justify-between mr-2"><span>Nama Peserta</span><span>:</span></div>
                    <div>{data?.Account.name}</div>
                </div>
                <div className="flex flex-row text-lg font-bold">
                    <div className="w-1/4 flex justify-between mr-2"><span>Tanggal Lahir</span><span>:</span></div>
                    
                    {data?.Account.tglLahir && <div>{format(new Date(data?.Account.tglLahir as string), 'dd MMMM yyyy')}</div>}
                    
                </div>
                <div className="flex flex-row text-lg font-bold">
                    <div className="w-1/4 flex justify-between mr-2"><span>Tujuan</span><span>:</span></div>
                    <div>{data?.tujuan}</div>
                </div>
            </div>
            <div className="flex flex-row text-white space-x-12 px-12">
                
                <div className="flex flex-col justify-center items-center space-y-2 bg-slate-500 w-32 h-32 rounded-full hover:bg-red-400">
                    <div className="text-sm font-light">Dikerjakan</div>
                    <div className="text-2xl font-bold">{data?.totalDikerjakan}</div>
                </div>
                <div className="flex flex-col justify-center items-center space-y-2 bg-slate-500 w-32 h-32 rounded-full hover:bg-red-400">
                    <div className="text-sm font-light">Total Benar</div>
                    <div className="text-2xl font-bold">{data?.sumCorrect}</div>
                </div>
                <div className="flex flex-col justify-center items-center space-y-2 bg-slate-500 w-32 h-32 rounded-full hover:bg-red-400">
                    <div className="text-sm font-light">Total Salah</div>
                    <div className="text-2xl font-bold">{data?.sumWrong}</div>
                </div>
            </div>
            {
                isLoading && <div>Loading . . .</div>
            }
            {
                data && <LineChart dataCorrect={data.correctPerColumn} dataWrong={data.wrongPerColumn} />
            }


        </DashboardLayout>
    )
}

export default DetailResult