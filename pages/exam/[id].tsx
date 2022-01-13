import { NextPage } from "next";
import Timer from "@components/counters/timer";
import ExamLayout from "@components/layouts/ExamLayout";
import AnswerBoard from "@components/counters/answerBoard";


const ExamPage: NextPage = () => {

    return (
        <ExamLayout>
            <div className="flex flex-row justify-between">
                <Timer />
                <AnswerBoard />
            </div>
        </ExamLayout>
    )
}

export default ExamPage