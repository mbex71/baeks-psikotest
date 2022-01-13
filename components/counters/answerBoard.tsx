interface IProps {
    jumlahSoal: number
    jumlahJawab: number
}

const AnswerBoard: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="text-2xl font-bold border-2 border-gray-400 rounded w-1/6 p-4 flex flex-row justify-around items-center">
            <div>{props.jumlahJawab ? props.jumlahJawab : 0}</div>
            <div className="w-[.1rem] h-full bg-gray-400"></div>
            <div>{props.jumlahSoal ? props.jumlahSoal : 0}</div>
        </div>
    )
}

export default AnswerBoard