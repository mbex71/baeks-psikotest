import { NextPage } from "next";
import Timer from "@components/counters/timer";
import ExamLayout from "@components/layouts/ExamLayout";
import AnswerBoard from "@components/counters/answerBoard";


const ExamPage: NextPage = () => {

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
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">9</div>
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">7</div>
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">2</div>
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">6</div>
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">4</div>
                </div>
                <div className="grid grid-cols-5 w-6/12">
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">A</div>
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">B</div>
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">C</div>
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">D</div>
                    <div className="border flex justify-center items-center p-6 border-gray-400 font-bold">E</div>
                </div>
            </section>


            <section className="mt-12 flex flex-col justify-center items-center">
                {/* Form Question */}
                <div className="grid grid-cols-4 w-6/12 mt-12" >
                    <div className="flex justify-center items-center p-6 font-bold">9</div>
                    <div className="flex justify-center items-center p-6 font-bold">7</div>
                    <div className="flex justify-center items-center p-6 font-bold">2</div>
                    <div className="flex justify-center items-center p-6 font-bold">6</div>
                </div>

                {/* Form Jawaban */}
                <div className="grid grid-cols-5 w-6/12">
                    <button className="border flex justify-center items-center p-6 border-gray-400 hover:font-bold">A</button>
                    <button className="border flex justify-center items-center p-6 border-gray-400 hover:font-bold">B</button>
                    <button className="border flex justify-center items-center p-6 border-gray-400 hover:font-bold">C</button>
                    <button className="border flex justify-center items-center p-6 border-gray-400 hover:font-bold">D</button>
                    <button className="border flex justify-center items-center p-6 border-gray-400 hover:font-bold">E</button>
                </div>
            </section>
        </ExamLayout>
    )
}

export default ExamPage