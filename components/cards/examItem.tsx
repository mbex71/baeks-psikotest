
interface IProps {
    children: React.ReactNode;
}

const ExamItem: React.FC = (props) => {
    return (
        <div className="bg-slate-700 text-white p-8 w-1/2 rounded">
            {props.children}
        </div>
    )
}

export default ExamItem