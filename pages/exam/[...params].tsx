import { NextPage } from "next";
import Timer from "@components/counters/timer";
import ExamLayout from "@components/layouts/ExamLayout";
import AnswerBoard from "@components/counters/answerBoard";

import { IUserExam } from '@modules/dto/exam'
import { useUserExam } from '@modules/hooks/exam'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { stringToArray } from '@helpers/string'
import { getStorage, removeStorage, setStorage } from "@helpers/storage";

type TParamExam = {
    testId: string,
    soalId: number
}

const ExamPage: NextPage = () => {

    const [stateJwb, setStateJwb] = useState(0)
    const [jawaban, setJawaban] = useState('')
    const router = useRouter()

    const testId = router.query.params?.[0] as string
    const soalId = parseInt(router.query.params?.[1] as string)

    const { data: dataUjian } = useUserExam({
        testId: testId,
        soalId: soalId
    })



    const handleAnswer = (jwb: string, optionId: number) => {
        setStateJwb(prevState => prevState + 1)
        setJawaban(jwb)
        setStorage('optionId', optionId)
    }

    const handleTimerFinish = () => {
        router.push(`/exam/${testId}/${soalId + 1}`)
        removeStorage('timer')
        removeStorage('optionId')
        setStateJwb(0)
    }


    useEffect(() => {
        if (router.query.params?.[1]) {
            setStorage('testId', router.query.params?.[0] as string)
            setStorage('soalId', router.query.params?.[1] as string)
        }

    }, [router.query.params])

    useEffect(() => {
        if (getStorage('optionId')) {
            setStateJwb(getStorage('optionId'))
        }
    }, [])

    console.log(dataUjian)
    return (
        <ExamLayout>
            <section className="flex flex-row justify-between">
                {/* <Timer timer={dataUjian?.soalOnTest?.[0].time as number} /> */}
                {
                    dataUjian?.timer ? <Timer timer={dataUjian?.timer} handleCompleted={handleTimerFinish} /> : <div className="text-2xl font-bold border-2 bg-white rounded w-1/6 flex justify-center items-center p-4">00 : 00</div>
                }

                <div className="border rounded w-3/6 text-center p-4 space-y-2 bg-white">
                    <div className="text-2xl tracking-wider font-bold">Binlat sikap kerja tamtama 2021</div>

                    <div className="text-base font-mono font-light text-black opacity-25">
                        Type Test:  {dataUjian?.soalOnTest?.[0]?.Soal?.TypeSoal.name}
                    </div>
                </div>
                <AnswerBoard jumlahSoal={50} jumlahJawab={stateJwb} />
            </section>
            {/* Form Pertanyaan */}
            <section className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-5 w-6/12 mt-12 bg-white">
                    {
                        stringToArray(dataUjian?.soalOnTest?.[0]?.Soal?.question as string, ',')?.map((item, index) => <div key={index} className="border flex justify-center items-center p-2 font-bold text-xl">{item}</div>)

                    }
                </div>
                <div className="grid grid-cols-5 w-6/12 bg-white">
                    {
                        stringToArray(dataUjian?.soalOnTest?.[0]?.Soal?.listOfChoise as string, ',')?.map((item, index) => <div key={index} className="border uppercase flex justify-center items-center p-2 font-bold">{item}</div>)
                    }
                </div>
            </section>

            <section className="mt-12 flex flex-col justify-start items-start">
                {

                    dataUjian?.soalOnTest?.[0]?.Soal.Options.map((item, index) => {
                        if (index === stateJwb) {
                            return (
                                <div key={index}>

                                    <div className="grid grid-cols-4 w-12/12 mt-12 bg-white text-2xl">
                                        {
                                            stringToArray(item?.question as string, ',')?.map((item, index) => <div key={index} className="flex justify-center items-center p-6 font-bold">{item}</div>)
                                        }
                                    </div>
                                    <div className="grid grid-cols-5 w-12/12 gap-2 mt-2">
                                        <button onClick={() => handleAnswer('a', item.id)} className="bg-white border rounded-full flex justify-center items-center p-2 hover:bg-stone-800 hover:text-white hover:font-bold">A</button>
                                        <button onClick={() => handleAnswer('b', item.id)} className="bg-white border rounded-full flex justify-center items-center p-2 hover:bg-stone-800 hover:text-white hover:font-bold">B</button>
                                        <button onClick={() => handleAnswer('c', item.id)} className="bg-white border rounded-full flex justify-center items-center p-2 hover:bg-stone-800 hover:text-white hover:font-bold">C</button>
                                        <button onClick={() => handleAnswer('d', item.id)} className="bg-white border rounded-full flex justify-center items-center p-2 hover:bg-stone-800 hover:text-white hover:font-bold">D</button>
                                        <button onClick={() => handleAnswer('e', item.id)} className="bg-white border rounded-full flex justify-center items-center p-2 hover:bg-stone-800 hover:text-white hover:font-bold">E</button>
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