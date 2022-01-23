import { NextPage } from "next";
import Timer from "@components/counters/timer";
import ExamLayout from "@components/layouts/ExamLayout";
import AnswerBoard from "@components/counters/answerBoard";

import { IUserExam } from '@modules/dto/exam'
import { useUserExam } from '@modules/hooks/exam'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { stringToArray } from '@helpers/string'
import { setStorage } from "@helpers/storage";

type TParamExam = {
    testId: string,
    soalId: number
}

const ExamPage: NextPage = () => {

    const [stateJwb, setStateJwb] = useState(0)
    const [jawaban, setJawaban] = useState('')
    const router = useRouter()


    const { data: dataUjian } = useUserExam({
        testId: router.query.params?.[0] as string,
        soalId: parseInt(router.query.params?.[1] as string)
    })



    const handleAnswer = (jwb: string) => {
        setStateJwb(prevState => prevState + 1)
        setJawaban(jwb)
    }


    useEffect(() => {
        if (router.query.params?.[1]) {
            setStorage('testId', router.query.params?.[0] as string)
            setStorage('soalId', router.query.params?.[1] as string)
        }
        console.log('Question: ', dataUjian?.soalOnTest?.[0]?.Soal?.Options[0].question)
    }, [router.query.params])
    return (
        <ExamLayout>
            <section className="flex flex-row justify-between">
                <Timer timer={60000} />
                <div className="border-2 border-gray-400 rounded w-3/6 text-center p-4 space-y-2">
                    <div className="text-2xl tracking-wider font-bold">Binlat sikap kerja tamtama 2021</div>
                    <div className="text-base font-mono font-light">Kolom 1</div>
                </div>
                <AnswerBoard jumlahSoal={50} jumlahJawab={30} />
            </section>
            {/* Form Pertanyaan */}
            <section className="mt-12 flex flex-col justify-center items-center">
                <div className="grid grid-cols-5 w-6/12 mt-12" >
                    {

                        stringToArray(dataUjian?.soalOnTest?.[0]?.Soal?.question as string, ',')?.map((item, index) => <div key={index} className="border flex justify-center items-center p-6 border-gray-400 font-bold">{item}</div>)

                    }
                </div>
                <div className="grid grid-cols-5 w-6/12">
                    {

                        stringToArray(dataUjian?.soalOnTest?.[0]?.Soal?.listOfChoise as string, ',')?.map((item, index) => <div key={index} className="border flex justify-center items-center p-6 border-gray-400 font-bold">{item}</div>)
                    }
                </div>
            </section>

            {/* <section className="mt-12 flex flex-col justify-center items-center">
                {
                    data.options.map((item, index) => {
                        if (index === stateJwb) {
                            return (
                                <div key={index}>
                                    <div className="grid grid-cols-4 w-6/12 mt-12" >
                                        {
                                            item.soal.map((soal, index) => <div key={index} className="flex justify-center items-center p-6 font-bold">{soal}</div>)
                                        }

                                    </div>



                                    <div className="grid grid-cols-5 w-12/12 bg-red-500">
                                        {
                                            item.pilihan.map((pilihan, index) => <button key={index} onClick={() => handleAnswer(pilihan)} className="border flex justify-center items-center p-6 border-gray-400 hover:font-bold">{pilihan}</button>)
                                        }

                                    </div>
                                </div>
                            )
                        }

                        return null
                    })
                }


            </section> */}
        </ExamLayout >
    )
}

export default ExamPage