import { NextPage } from "next";
import LineChart from '@components/charts/LineChart'
import { ExamLayout } from "@components/layouts";

const Results: NextPage = () => {
    return (
        <ExamLayout>

            <LineChart />
        </ExamLayout>


    )
}

export default Results