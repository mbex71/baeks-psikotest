import { ExamLayout } from "@components/layouts/";
import { NextPage } from "next";
import { ExamItem } from '@components/cards'
import { format } from 'date-fns'
import { useExamList } from '@modules/hooks/exam'
import { useState } from "react";
import { StatusTest } from '@modules/entities/exam'
import { useRouter } from 'next/router'

import { RiLoader5Line } from 'react-icons/ri'
import { BsFillExclamationCircleFill } from 'react-icons/bs'

import { useStartExam } from '@modules/hooks/exam'
import { getStorage } from "@helpers/storage";
import { useSession } from 'next-auth/react'

type TParams = {
    status: StatusTest
}

const Exam: NextPage = () => {
    const router = useRouter()
    const [params, setParams] = useState<TParams>({
        status: 'ACTIVE'
    })
    const { data, isLoading } = useExamList(params)
    const { mutate } = useStartExam()
    const { data: user, status } = useSession()


    const handleStartExam = (testCode: string, status: string | StatusTest) => {
        mutate({ status: "ONGOING", testCode: testCode })

        if (!getStorage('soalId')) {
            router.push(`/exam/${testCode}/1`)
        } else {
            router.push(`/exam/${testCode}/${getStorage('soalId')}`)
        }
    }

    const handleSetStatus = (val: TParams) => {

        setParams({ status: val.status })
    }

    return (
        <ExamLayout>
            <div className="flex flex-col w-full h-full justify-start items-center">
                <div className="mt-6 mb-2 flex justify-start w-1/2">
                    <h1 className="text-white text-lg font-bold">Data Peserta</h1>
                </div>
                <div className="bg-slate-700 w-1/2 p-4 rounded-lg text-white flex flex-col space-y-2">
                    <div className="flex flex-row space-x-12 items-center justify-start w-full">
                        <div className="font-light text-sm w-1/4">Nama</div>
                        <div className="text-2xl font-bold">{user?.user.name}</div>
                    </div>
                    <div className="flex flex-row space-x-12 items-center justify-start w-full">
                        <div className="font-light text-sm w-1/4">Username</div>
                        <div className="text-2xl font-bold">{user?.user.username}</div>
                    </div>
                </div>
                <div className="mt-12 mb-2 flex justify-start w-1/2">
                    <h1 className="text-white text-lg font-bold">List Ujian</h1>
                </div>
                <div className="my-2 flex justify-start w-1/2 space-x-2">
                    <button onClick={() => handleSetStatus({ status: 'ACTIVE' })} className={`text-white p-2 rounded-lg w-1/4 ${params.status === "ACTIVE" ? 'bg-emerald-400' : null}`}>Active</button>
                    <button onClick={() => handleSetStatus({ status: 'ONGOING' })} className={`text-white p-2 rounded-lg w-1/4 ${params.status === "ONGOING" ? 'bg-emerald-400' : null}`}>OnGoing</button>
                    <button onClick={() => handleSetStatus({ status: 'SUCCESS' })} className={`text-white p-2 rounded-lg w-1/4 ${params.status === "SUCCESS" ? 'bg-emerald-400' : null}`}>Success</button>
                    <button onClick={() => handleSetStatus({ status: 'FAILED' })} className={`text-white p-2 rounded-lg w-1/4 ${params.status === "FAILED" ? 'bg-emerald-400' : null}`}>Failed</button>
                </div>
                <>

                    {
                        isLoading ? <div className="flex h-full w-full justify-center items-center"><RiLoader5Line className="animate-spin text-4xl" /></div> : null
                    }

                    {data?.length === 0 && <div className="flex h-full w-full justify-center items-center font-light text-white text-2xl my-6">Data tidak ditemukan!</div>}

                    {data?.map((item, index) => (
                        <ExamItem key={index}>
                            <div className="flex flex-row w-full h-full">
                                <div className="flex flex-col justify-center items-start text-sm w-3/4">
                                    <div className="text-xs text-white opacity-50 mb-4">{format(new Date(item?.registrationDate), 'dd MMMM yyyy')}</div>
                                    <div className="font-bold text-sm tracking-widest text-yellow-400 flex flex-row items-center"> <BsFillExclamationCircleFill className="mr-2" />{item?.status}</div>
                                    <div className="font-extrabold text-4xl tracking-widest font-mono text-white">{item?.testCode}</div>
                                    <div className="text-sm mb-4 tracking-wide text-white opacity-80">{item?.Account.name}</div>
                                    <div className="text-xs text-white opacity-50">Tujuan: {item?.tujuan}</div>
                                </div>
                                <div className="w-1/4 flex justify-center items-center h-full">
                                    {
                                        item.status === "ACTIVE" || item.status === "ONGOING" ? <button
                                            onClick={() => handleStartExam(item.testCode, item.status)}
                                            className="w-full bg-emerald-400 p-4 text-white rounded font-bold tracking-wider hover:bg-emerald-500 text-sm">
                                            START
                                        </button> : null
                                    }


                                </div>
                            </div>

                        </ExamItem>

                    ))}

                </>
            </div>
        </ExamLayout>
    )
}

export default Exam