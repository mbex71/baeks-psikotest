import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown"

interface IProps {
    handleCompleted?: () => void
    timer: number
}


const renderer = ({ minutes, seconds, completed, }: CountdownRenderProps) => {
    if (completed) {
        return <div className="text-2xl font-bold border-2 border-gray-400 rounded w-1/6 flex justify-center items-center p-4">Finish</div>
    }
    else {
        return <div className="text-2xl font-bold border-2 border-gray-400 rounded w-1/6 flex justify-center items-center p-4">{zeroPad(minutes)} : {zeroPad(seconds)}</div>
    }
}

const Timer: React.FC<IProps> = ({ handleCompleted, timer }: IProps) => {
    return <Countdown date={Date.now() + timer} renderer={renderer} onComplete={handleCompleted} />
}

export default Timer