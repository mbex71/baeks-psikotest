
interface IProps {
    children: React.ReactNode;
}


const ExamLayout: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="w-full p-12 min-h-screen bg-white h-full">
            {props.children}
        </div>
    )
}

export default ExamLayout