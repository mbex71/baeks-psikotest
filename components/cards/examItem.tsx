
interface IProps {
    children: React.ReactNode;
}

const ExamItem: React.FC = (props) => {
    return (
        <div className="bg-white p-8 text-gray-800 w-1/2 rounded shadow-sm">
            {props.children}
        </div>
    )
}

export default ExamItem