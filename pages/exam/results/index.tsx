import { NextPage } from "next";
import { ExamLayout } from "@components/layouts";
import { useExamResultList } from '@modules/hooks/results'
import { ITest } from "@modules/entities/exam";
import { format } from 'date-fns'
import Link from 'next/link'


const Card: React.FC<ITest> = (props: ITest) => {
    return (
        <Link href={`/exam/results/${props.testCode}`}>
            <a>
                <div className="bg-white p-6 rounded-lg w-1/2">
                    <p className="text-gray-400 text-xs mb-2">{format(new Date(props.registrationDate), 'dd MMMM yyyy')}</p>
                    <div className="flex flex-row items-center space-x-6">
                        <h1 className="text-slate-800 text-lg font-light tracking-wider">No Ujian:</h1>
                        <h1 className="text-slate-800 text-xl font-bold">{props.testCode}</h1>
                    </div>
                </div>
            </a>
        </Link>
    )
}

const Results: NextPage = () => {
    const { data } = useExamResultList()
    return (
        <ExamLayout>
            <h1 className="text-4xl text-white font-bold">Test Results</h1>
            <div className="mt-12">
                {
                    data && data.Test.map((test, index) => <Card key={index} {...test} />)
                }
            </div>
        </ExamLayout>


    )
}

export default Results