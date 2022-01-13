
interface IProps {
    children: React.ReactNode;
}


const ExamLayout: React.FC<IProps> = (props: IProps) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default ExamLayout