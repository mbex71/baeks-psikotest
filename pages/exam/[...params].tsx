import { NextPage } from "next";
import Timer from "@components/counters/timer";
import ExamLayout from "@components/layouts/ExamLayout";
import AnswerBoard from "@components/counters/answerBoard";

import { IUserExam } from '@modules/dto/exam'
import { useSubmitJawaban, useUserExam } from '@modules/hooks/exam'
import { useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/router'

import { stringToArray } from '@helpers/string'
import { getStorage, removeStorage, setStorage } from "@helpers/storage";
import style from '../../styles/exam.module.css'
import { useStartExam } from '@modules/hooks/exam'
import data from "databases/seeders/dev/timer";

type TParamExam = {
    testId: string,
    soalId: number
}

type THandleTimer = {
    dataUjian?: IUserExam,
    timer: number,
    soalId: number,
    handleTimerFinish?: () => void
}

const HandleTimer = ({ dataUjian, soalId, timer, handleTimerFinish }: THandleTimer) => {
    // return dataUjian?.soalOnTest?.find(item => item.Soal.id === soalId) ? <Timer timer={dataUjian?.soalOnTest[0].timer} handleCompleted={handleTimerFinish} /> : <div className="text-2xl font-bold border-2 bg-white rounded w-1/6 flex justify-center items-center p-4">00 : 00</div>
    return timer ? <Timer timer={timer} handleCompleted={handleTimerFinish} /> : <div className="text-2xl font-bold border-2 bg-white rounded w-1/6 flex justify-center items-center p-4">00 : 00</div>
}

const ExamPage: NextPage = () => {

    const [stateJwb, setStateJwb] = useState(0)
    const [jawaban, setJawaban] = useState('')
    const router = useRouter()

    const testId = router.query.params?.[0] as string
    const soalId = parseInt(router.query.params?.[1] as string)

    const { data: dataUjian, isLoading } = useUserExam({
        testId: testId,
        soalId: soalId
    })

    const { mutateAsync: mutateChangeStatus } = useStartExam()

    const { mutateAsync } = useSubmitJawaban()


    const handleAnswer = (jwb: string, optionId: number) => {
        if (dataUjian?.optionsLength) {
            if (stateJwb < dataUjian?.optionsLength - 1) {
                mutateAsync({ answer: jwb, optionId: optionId, soaldId: soalId, testCode: dataUjian?.testCode as string }).then(() => {
                    setStateJwb(prevState => prevState + 1)
                    setJawaban(jwb)
                    // setStorage('optionId', optionId)
                }).catch(e => alert(e))

            } 
            
            else {
                mutateAsync({ answer: jwb, optionId: optionId, soaldId: soalId, testCode: dataUjian?.testCode as string }).then(() => {
                    
                    router.push(`/exam/${testId}/${soalId + 1}`)
                    // router.push(`/exam/results/${testId}`)
                    removeStorage('timer')
                    removeStorage('optionId')
                    setStateJwb(0)
                }).catch(e => alert(e))

            }
        }

    }

    const handleTimerFinish = () => {
        if (dataUjian?.testLength) {
            if (soalId < dataUjian?.testLength) {
                router.push(`/exam/${testId}/${soalId + 1}`)
                removeStorage('timer')
                removeStorage('optionId')
                setStateJwb(0)
            } else {
                mutateChangeStatus({ testCode: dataUjian?.testCode as string, status: 'DONE' }).then(() => {
                    router.push(`/exam`)
                    removeStorage('timer')
                    removeStorage('optionId')
                    setStateJwb(0)
                })

            }
        }
    }


    useEffect(() => {
        
        if(dataUjian?.soalOnTest?.length === 0 ) {
            router.push(`/exam/results/${testId}`)
        }
    }, [dataUjian])

    useEffect(() => {
        if (getStorage('optionId')) {
            setStateJwb(getStorage('optionId'))
        }
    }, [])


    return (
        <ExamLayout>
            <section className="flex flex-row justify-between">
                
                {dataUjian?.soalOnTest && dataUjian.soalOnTest.length > 0 ? <HandleTimer timer={dataUjian?.soalOnTest?.[0].timer as number} dataUjian={dataUjian} soalId={soalId} handleTimerFinish={handleTimerFinish} /> : null}
                
                

                <div className="border rounded w-3/6 text-center p-4 space-y-2 bg-white">
                    <div className="text-2xl tracking-wider font-bold">Sikap Kerja</div>

                    <div className="text-base font-mono font-light text-black opacity-25">
                        Type Test:  {dataUjian?.soalOnTest?.[0]?.Soal?.TypeSoal.name}
                    </div>
                </div>
                {dataUjian && <AnswerBoard jumlahSoal={dataUjian.optionsLength as number} jumlahJawab={stateJwb} />}

            </section>
            {/* Form Pertanyaan */}
            <section className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-5 w-6/12 mt-12 bg-white">
                    {
                        stringToArray(dataUjian?.soalOnTest?.[0]?.Soal?.question as string, ',')?.map((item, index) => <div key={index} className={`border flex justify-center items-center p-2 font-bold text-8xl ${dataUjian?.soalOnTest?.[0]?.Soal?.TypeSoal.name === "SYMBOL" ? style.symbol : null}`}>{item}</div>)

                    }
                </div>
                <div className="grid grid-cols-5 w-6/12 bg-white">
                    {
                        stringToArray(dataUjian?.soalOnTest?.[0]?.Soal?.listOfChoise as string, ',')?.map((item, index) => <div key={index} className="border uppercase flex justify-center items-center p-2 font-bold text-2xl">{item}</div>)
                    }
                </div>
            </section>

            <section className="mt-12 flex flex-col justify-center items-center">
                {
                    dataUjian?.soalOnTest?.[0]?.Soal.Options.map((item, index) => {
                        if (index === stateJwb) {
                            return (
                                <div key={index} className="w-3/4">

                                    <div className="grid grid-cols-4 w-12/12 mt-12 bg-white text-2xl">
                                        {
                                            stringToArray(item?.question as string, ',')?.map((item, index) => <div key={index} className={`flex justify-center items-center p-6 font-bold text-8xl ${dataUjian?.soalOnTest?.[0]?.Soal?.TypeSoal.name === "SYMBOL" ? style.symbol : null}`}>{item}</div>)
                                        }
                                    </div>
                                    <div className="grid grid-cols-5 w-12/12 gap-6 mt-6 h-24">
                                        <button onClick={() => handleAnswer('a', item.id)} className={`bg-white border rounded-full flex justify-center items-center hover:bg-stone-800 hover:text-white hover:font-bold text-2xl`}>A</button>
                                        <button onClick={() => handleAnswer('b', item.id)} className={`bg-white border rounded-full flex justify-center items-center hover:bg-stone-800 hover:text-white hover:font-bold text-2xl`}>B</button>
                                        <button onClick={() => handleAnswer('c', item.id)} className={`bg-white border rounded-full flex justify-center items-center hover:bg-stone-800 hover:text-white hover:font-bold text-2xl`}>C</button>
                                        <button onClick={() => handleAnswer('d', item.id)} className={`bg-white border rounded-full flex justify-center items-center hover:bg-stone-800 hover:text-white hover:font-bold text-2xl`}>D</button>
                                        <button onClick={() => handleAnswer('e', item.id)} className={`bg-white border rounded-full flex justify-center items-center hover:bg-stone-800 hover:text-white hover:font-bold text-2xl`}>E</button>
                                    </div>

                                </div>
                            )
                        }


                        return null
                    })
                }


            </section>
        </ExamLayout >
    )
}

export default ExamPage