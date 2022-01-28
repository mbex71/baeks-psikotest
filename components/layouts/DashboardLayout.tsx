import { useSession, signOut } from 'next-auth/react'
import Head from "next/head";
import Link from "next/link";

interface IProps {
    children: React.ReactNode
}

const DashboardLayout: React.FC<IProps> = (props: IProps) => {
    const { data, status } = useSession()

    const handleLogout = () => signOut()

    return (
        <div className='min-h-screen '>
            <Head>
                <title>BAEKS - Psikotest</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-row w-full h-full min-h-screen justify-between relative">
                <div className='fixed w-2/12 min-h-screen bg-slate-800 text-white border-r border-slate-400 border-opacity-10'>
                    <div className='flex flex-col px-6 py-12 space-y-12 w-full'>
                        <div>
                            <h1 className="text-2xl font-bold">BAEKS Psikotest</h1>
                        </div>
                        <Link href="/dashboard/accounts">
                            <a className='text-sm'>
                                Accounts
                            </a>
                        </Link>

                        <Link href="/dashboard/accounts">
                            <a className='text-sm'>
                                Exams
                            </a>
                        </Link>
                        <Link href="/dashboard/accounts">
                            <a className='text-sm'>
                                Setting
                            </a>
                        </Link>
                        <div>
                            {status === 'authenticated' ? <button onClick={handleLogout} className='text-sm'>Logout</button> : null}
                        </div>

                    </div>

                </div>
                <div className='w-10/12 p-12 bg-slate-800 text-white h-full min-h-screen overflow-y-auto right-0 absolute origin-top-right'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout