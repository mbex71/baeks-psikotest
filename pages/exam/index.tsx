import { ExamLayout } from "@components/layouts/";
import { NextPage } from "next";
import { IExam } from '@modules/entities/exam'
import { ExamItem } from '@components/cards'
import { format } from 'date-fns'
import { useExamList } from '@modules/hooks/exam'
import { useEffect, useState } from "react";
import { IUserExam } from '@modules/dto/exam'
import { StatusTest } from '@modules/entities/exam'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { RiLoader5Line } from 'react-icons/ri'
import { BsFillExclamationCircleFill } from 'react-icons/bs'

import { useCreateExam } from '@modules/hooks/exam'
import { getStorage } from "@helpers/storage";

type TParams = {
    status: StatusTest
}

const Exam: NextPage = () => {
    const router = useRouter()
    const [params, setParams] = useState<TParams>({
        status: 'ACTIVE'
    })
    const { data, isLoading } = useExamList(params)
    const createExam = useCreateExam()

    const handleStartExam = (testCode: string, status: string | StatusTest) => {
        createExam.mutate(testCode, {
            onSuccess: (data) => {
                console.log('DATA: ', data)
                if (!getStorage('soalId')) {
                    router.push(`/exam/${testCode}/1`)
                } else {
                    router.push(`/exam/${testCode}/${getStorage('soalId')}`)
                }
            },
            onError: (error) => {
                console.log('ERROR: ', error)
            }
        })
    }

    return (
        <ExamLayout>
            <div className="flex flex-col w-full h-full justify-start items-center space-y-4">
                <>
                    {
                        isLoading ? <div className="flex h-full w-full justify-center items-center"><RiLoader5Line className="animate-spin text-4xl" /></div> : null
                    }

                    {data?.length === 0 && <div className="flex h-full w-full justify-center items-center font-bold">Data not found!</div>}

                    {data?.map((item, index) => (
                        <ExamItem key={index}>
                            <div className="flex flex-row w-full h-full">
                                <div className="flex flex-col justify-center items-start text-sm w-3/4">
                                    <div className="text-xs text-black opacity-25 mb-4">{format(new Date(item?.registrationDate), 'dd MMMM yyyy')}</div>
                                    <div className="font-bold text-sm tracking-widest text-yellow-400 flex flex-row items-center"> <BsFillExclamationCircleFill className="mr-2" />{item?.status}</div>
                                    <div className="font-bold text-lg tracking-widest font-sans">{item?.testCode}</div>
                                    <div className="text-sm mb-4 tracking-wide text-black opacity-50 font-bold">{item?.Account.name}</div>
                                    <div className="text-xs text-black opacity-50">Tujuan: {item?.tujuan}</div>
                                </div>
                                <div className="w-1/4 flex justify-center items-center h-full">

                                    <button
                                        onClick={() => handleStartExam(item.testCode, item.status)}
                                        className="w-full bg-blue-400 p-4 text-white rounded font-bold tracking-wider hover:bg-blue-500 text-sm">
                                        START
                                    </button>

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