import { useSession, signOut } from 'next-auth/react'

interface IProps {
    children: React.ReactNode
}

const DashboardLayout:React.FC<IProps> = (props:IProps) => {
    const { data, status } = useSession()
    
    const handleLogout = () => signOut()

    return(
        <div className="bg-white min-h-screen">
            <div>
                {status === 'authenticated' ? <button onClick={handleLogout}>Logout</button> : null}
            </div>
            <div>
            {props.children}
            </div>
        </div>
    )
}

export default DashboardLayout