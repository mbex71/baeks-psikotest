import LineChart from "@components/charts/LineChart";
import { ExamLayout } from "@components/layouts";
import { NextPage } from "next";
import { TParam, TResults } from '@modules/entities/results'
import { useExamResultDetails } from '@modules/hooks/results'
import { useRouter } from 'next/router'
import { useEffect } from "react";

const DetailResult: NextPage = () => {
    const router = useRouter()

    const testCode = router.query.testCode as string

    const { data, isLoading } = useExamResultDetails({ testCode })

    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <ExamLayout>
            <div className="flex flex-row text-white space-x-12">
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


        </ExamLayout>
    )
}

export default DetailResult