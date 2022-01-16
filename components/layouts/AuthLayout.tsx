
interface IProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="bg-white min-h-screen">
            {props.children}
        </div>
    )
}

export default AuthLayout