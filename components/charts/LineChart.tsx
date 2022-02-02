import { VictoryGroup, VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryBar } from 'victory';
import { TCorrectPerColumn, TWrongPerColumn } from '@modules/entities/results'

interface IProps {
    dataCorrect: TCorrectPerColumn[]
    dataWrong: TWrongPerColumn[]
}


const LineChart: React.FC<IProps> = ({ dataCorrect, dataWrong }: IProps) => {

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            width={1200}
            height={300}
        >
            <VictoryGroup
                // offset={10}
                style={{
                    data: {
                        fillOpacity: 0.7, stroke: "black", strokeWidth: 3
                    }
                }}
            >
                <VictoryLine
                    interpolation="linear"
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    style={{
                        data: { stroke: "#2563EB" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    // style={{
                    //     data: {
                    //         stroke: "#2563EB",
                    //     },

                    // }}
                    data={dataCorrect}
                    x={x => x.id}
                    y="totalJawaban"
                    domain={{ x: [0, 30], y: [0, 50] }}
                    labels={({ datum }) => `${datum.totalJawaban}`}


                />

                <VictoryLine
                    interpolation="linear"
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    // style={{
                    //     data: {
                    //         stroke: "#E11D48",
                    //     },

                    // }}
                    style={{
                        data: { stroke: "#E11D48" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={dataWrong}
                    domain={{ x: [0, 30], y: [0, 50] }}
                    x={x => x.id}
                    y="totalJawaban"
                    labels={({ datum }) => `${datum.totalJawaban}`}

                />

            </VictoryGroup>


        </VictoryChart>
    )
}

export default LineChart