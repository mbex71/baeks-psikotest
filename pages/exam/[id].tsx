import { NextPage } from "next";
import Timer from "@components/counters/timer";
import ExamLayout from "@components/layouts/ExamLayout";
import AnswerBoard from "@components/counters/answerBoard";

import { ISheetUjian } from '@modules/entities/exam'
import { useState } from "react";


const ExamPage: NextPage = () => {

    const [stateJwb, setStateJwb] = useState(0)
    const [jawaban, setJawaban] = useState('')

    const data: ISheetUjian = {
        soal: {
            id: 1,
            pertanyaan: ['9', '2', '5', '3', '7'],
            pilihan: ['A', 'B', 'C', 'D', 'E'],
            time: 120,
            totalQuestion: 50
        },
        options: [
            {
                soal: ['2', '5', '3', '7'],
                pilihan: ['A', 'B', 'C', 'D', 'E'],
            },
            {
                soal: ['9', '5', '3', '7'],
                pilihan: ['A', 'B', 'C', 'D', 'E'],
            }
        ]
    }

    const handleAnswer = (jwb: string) => {
        setStateJwb(prevState => prevState + 1)
        setJawaban(jwb)
    }

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
                        data.soal.pertanyaan.map((item, index) => (
                            <div key={index} className="border flex justify-center items-center p-6 border-gray-400 font-bold">{item}</div>))
                    }
                </div>
                <div className="grid grid-cols-5 w-6/12">
                    {
                        data.soal.pilihan.map((item, index) => <div key={index} className="border flex justify-center items-center p-6 border-gray-400 font-bold">{item}</div>)
                    }
                </div>
            </section>

            <section className="mt-12 flex flex-col justify-center items-center">
                {
                    data.options.map((item, index) => {
                        if (index === stateJwb) {
                            return (
                                <>
                                    <div className="grid grid-cols-4 w-6/12 mt-12" >
                                        {
                                            item.soal.map((soal, index) => <div key={index} className="flex justify-center items-center p-6 font-bold">{soal}</div>)
                                        }

                                    </div>


                                    {/* Form Jawaban */}
                                    <div className="grid grid-cols-5 w-6/12">
                                        {
                                            item.pilihan.map((pilihan, index) => <button key={index} onClick={() => handleAnswer(pilihan)} className="border flex justify-center items-center p-6 border-gray-400 hover:font-bold">{pilihan}</button>)
                                        }

                                    </div>
                                </>
                            )
                        }

                        return null
                    })
                }


            </section>
        </ExamLayout>
    )
}

export default ExamPage