import { ExamLayout } from "@components/layouts/";
import { NextPage } from "next";
import { IExam } from '@modules/entities/exam'
import { ExamItem } from '@components/cards'
import { format } from 'date-fns'
import { useExamList } from '@modules/hooks/exam'

const Exam: NextPage = () => {
    const { data } = useExamList()

    return (
        <ExamLayout>
            <div className="flex flex-col w-full h-full justify-start items-center space-y-4">
                {data?.map((item, index) => (
                    <ExamItem key={index}>
                        <div className="flex flex-row w-full h-full">
                            <div className="flex flex-col justify-center items-start text-sm w-3/4">
                                <div className="text-xs text-black opacity-25 mb-2">{format(item.tglPendaftaran, 'dd MMMM yyyy')}</div>
                                <div className="font-bold text-xl tracking-widest font-mono">{item.id}</div>
                                <div className="text-lg mb-2">{item.namaPeserta}</div>
                                <div className="text-xs text-black opacity-75">Tujuan: {item.tujuan}</div>
                            </div>
                            <div className="w-1/4 flex justify-center items-center h-full">
                                <button className="w-full bg-blue-400 p-4 text-white rounded font-bold tracking-wider hover:bg-blue-500 text-sm">START</button>
                            </div>
                        </div>

                    </ExamItem>

                ))}
            </div>
        </ExamLayout>
    )
}

export default Exam