import { VictoryGroup, VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryBar } from 'victory';
import { TCorrectPerColumn, TWrongPerColumn } from '@modules/entities/results'

interface IProps {
    dataCorrect: TCorrectPerColumn[]
    dataWrong: TWrongPerColumn[]
}


const LineChart: React.FC<IProps> = ({ dataCorrect, dataWrong }: IProps) => {
    console.log(dataWrong)
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            width={800}
            height={300}
        >
            <VictoryGroup
                offset={10}
                style={{
                    data: {
                        fillOpacity: 0.7, stroke: "black", strokeWidth: 3
                    }
                }}
            >
                <VictoryLine
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    style={{
                        data: {
                            stroke: "#2563EB",
                        },

                    }}
                    data={dataCorrect}
                    x="soal"
                    y="totalJawaban"
                    domain={{ y: [0, 50] }}

                />

                <VictoryLine

                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    style={{
                        data: {
                            stroke: "#E11D48",
                        },

                    }}
                    data={dataWrong}
                    domain={{ y: [0, 50] }}
                    x="soal"
                    y="totalJawaban"

                />

            </VictoryGroup>


        </VictoryChart>
    )
}

export default LineChart