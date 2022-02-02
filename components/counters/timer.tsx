import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown"
import { getStorage, removeStorage, setStorage, } from "@helpers/storage"
import { memo, useMemo, useRef } from 'react'

interface IProps {
    handleCompleted?: () => void
    timer?: number
}

type TTimer = {
    total: number
}


const Timer: React.FC<IProps> = ({ handleCompleted, timer }: IProps) => {
    const startDate = useRef(Date.now());

    const renderer = ({ minutes, seconds, completed, }: CountdownRenderProps) => {
        if (completed) {
            removeStorage('timer')
            return <div className="text-2xl font-bold border-2 bg-white rounded w-1/6 flex justify-center items-center p-4">Finish</div>
        }
        else {
            return <div className="text-2xl font-bold border-2 bg-white rounded w-1/6 flex justify-center items-center p-4">{zeroPad(minutes)} : {zeroPad(seconds)}</div>
        }
    }
    const handleSaveTimer = async (time: TTimer): Promise<void> => {
        await setStorage('timer', time.total)

    }

    const checkTimer = (): number => {
        const clock = getStorage('timer')
        // if (clock) {
        //     return parseInt(clock)
        // }
        return timer as number
    }

    return <Countdown

        date={startDate.current + checkTimer()}
        renderer={renderer}
        onComplete={handleCompleted}
    // onTick={handleSaveTimer}

    />
}

export default memo(Timer)