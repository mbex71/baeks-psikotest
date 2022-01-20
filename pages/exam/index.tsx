import { ExamLayout } from "@components/layouts/";
import { NextPage } from "next";
import { IExam } from '@modules/entities/exam'
import { ExamItem } from '@components/cards'
import { format } from 'date-fns'
import { useExamList } from '@modules/hooks/exam'
import { useEffect } from "react";
import { IUserExam } from '@modules/dto/exam'

import { RiLoader5Line } from 'react-icons/ri'
import { BsFillExclamationCircleFill } from 'react-icons/bs'


const Exam: NextPage = () => {
    const { data, isLoading } = useExamList()




    return (
        <ExamLayout>
            <div className="flex flex-col w-full h-full justify-start items-center space-y-4">
                <>
                    {
                        isLoading ? <div className="flex h-full w-full justify-center items-center"><RiLoader5Line className="animate-spin text-4xl" /></div> : null
                    }

                    {data?.map((item, index) => (
                        <ExamItem key={index}>
                            <div className="flex flex-row w-full h-full">
                                <div className="flex flex-col justify-center items-start text-sm w-3/4">
                                    <div className="text-xs text-black opacity-25 mb-4">{format(new Date(item?.registrationDate), 'dd MMMM yyyy')}</div>
                                    <div className="font-bold text-sm tracking-widest text-yellow-400 flex flex-row items-center"> <BsFillExclamationCircleFill className="mr-2" />{item?.status}</div>
                                    <div className="font-bold text-lg tracking-widest font-sans">{item?.id}</div>
                                    <div className="text-sm mb-4 tracking-wide text-black opacity-50 font-bold">{item?.User.name}</div>
                                    <div className="text-xs text-black opacity-50">Tujuan: {item?.tujuan}</div>
                                </div>
                                <div className="w-1/4 flex justify-center items-center h-full">
                                    <button className="w-full bg-blue-400 p-4 text-white rounded font-bold tracking-wider hover:bg-blue-500 text-sm">START</button>
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