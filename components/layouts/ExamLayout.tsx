import { removeStorage } from '@helpers/storage'
import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'
interface IProps {
    children: React.ReactNode;
}


const ExamLayout: React.FC<IProps> = (props: IProps) => {
    const { data, status } = useSession()
    const handleLogout = () => {
        signOut().then(() => {
            removeStorage('soalId')
            removeStorage('testId')
            removeStorage('timer')
            removeStorage('optionId')
        })
    }


    return (
        <div className="w-full min-h-screen bg-slate-800 h-screen">
            <div className='flex flex-row justify-end items-center space-x-0 fixed w-full text-sm bg-white shadow z-10'>
                <div className='text-slate-800 hover:bg-slate-800 hover:text-white p-4 w-1/12 text-center'>Exam</div>
                <div className='text-slate-800 hover:bg-slate-800 hover:text-white p-4 w-2/12 text-center'>History Test</div>

                {status !== 'loading' && status === 'authenticated' ? <button onClick={handleLogout} className='text-gray-600 hover:bg-stone-800 hover:text-white p-4 w-1/12'>Logout</button> : null}
            </div>
            <div className='h-full w-full p-24 overflow-y-auto'>
                {props.children}
            </div>
        </div>
    )
}

export default ExamLayout