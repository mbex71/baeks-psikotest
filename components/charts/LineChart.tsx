import { VictoryGroup, VictoryChart, VictoryTheme, VictoryLine,VictoryVoronoiContainer, VictoryAxis, VictoryBar } from 'victory';
import { TCorrectPerColumn, TWrongPerColumn, TTotalJawabPerColumn } from '@modules/entities/results'

interface IProps {
    dataCorrect: TCorrectPerColumn[]
    dataWrong: TWrongPerColumn[]
    dataJawab:TTotalJawabPerColumn[]
}


const LineChart: React.FC<IProps> = ({ dataCorrect, dataWrong, dataJawab }: IProps) => {

    return (
        <div className='bg-white mt-12'>
        <VictoryChart
            theme={VictoryTheme.material}
            // backgroundComponent={<VictoryVoronoiContainer  />}
            width={1200}
            height={400}
            
            
        >
            <VictoryGroup
                // offset={10}
                // domain={{ x:[1,30], y:[1,50] }}
                
                style={{
                    data: {
                        fillOpacity: 0.1, stroke: "black", strokeWidth: 5
                    }
                }}
            >
                <VictoryLine
                    interpolation="linear"
                    animate={{
                        
                        onLoad: { duration: 2000 }
                    }}
                    style={{
                        data: { stroke: "#2563EB" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    
                    data={dataCorrect}
                    x={x => x.soalId}
                    y="totalJawaban"
                    labels={({ datum }) => `${datum.totalJawaban}`}


                />

                <VictoryLine
                    interpolation="linear"
                    animate={{
                        
                        onLoad: { duration: 3000 }
                    }}
                  
                    style={{
                        data: { stroke: "#E11D48" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={dataWrong}
                    x={x => x.soalId}
                    y="totalJawaban"
                    labels={({ datum }) => `${datum.totalJawaban}`}

                />
                 <VictoryLine
                    interpolation="linear"
                    animate={{
                        
                        onLoad: { duration: 1000 }
                    }}
                  
                    style={{
                        data: { stroke: "#FACC15" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={dataJawab}
                    x={x => x.soalId}
                    y="totalJawaban"
                    labels={({ datum }) => `${datum.totalJawaban}`}
                    

                />

            </VictoryGroup>


        </VictoryChart>
        <div className='py-12 ml-12'>
        <div className='flex flex-row items-center space-x-6'>
                <div className='h-1 w-16 print:bg bg-[#FACC15]'></div>
                <span className='text-black text-xs'>Total Menjawab</span>
            </div>

            <div className='flex flex-row items-center space-x-6'>
                <div className='h-1 w-16 print:bg bg-[#2563EB]'></div>
                <span className='text-black text-xs'>Jawaban Benar</span>
            </div>
            
            <div className='flex flex-row items-center space-x-6'>
                <div className='h-1 w-16 print:block bg-[#E11D48]'></div>
                <span className='text-black text-xs'>Jawaban Salah</span>
            </div>
            
            
        </div>
        </div>
    )
}

export default LineChart