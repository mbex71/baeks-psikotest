import { DashboardLayout } from "@components/layouts";
import { NextPage } from "next";
import { useAccountDetail } from '@modules/hooks/dashboard/accounts'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { TParamDetailAccount } from "@modules/dto/account";
import { DashboardTables } from "@components/tables";
import React from 'react'
import { RiLoader5Line } from 'react-icons/ri'
import { format } from 'date-fns'
import { ITest } from "@modules/entities/exam";
import Link from 'next/link'

const DetailsPage: NextPage = () => {
    const router = useRouter()

    const { username } = router.query as TParamDetailAccount

    const { data, isLoading, error } = useAccountDetail({ username: username as string })
    const columns = React.useMemo(
        () => [
            {
                Header: 'Test Code',
                accessor: 'testCode', // accessor is the "key" in the data

            },
            {
                Header: 'Status',
                accessor: 'status'
            },
            {
                Header: 'Tgl Pendaftaran',
                accessor: 'registrationDate',
                Cell: (row: any) => <div>{format(new Date(row?.value), 'dd MMMM yyyy')}</div>

            },
            {
                Header: 'Tujuan',
                accessor: 'tujuan',


            },

        ],

        []

    )


    const dataTest = React.useMemo(() => data?.Test, [data]) as ITest[]


    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold">Detail Peserta</h1>
            <div className='mt-12 flex justify-between items-center'>
                <div className='flex flex-row space-x-4'>
                    <Link href={`/dashboard/accounts/${username}/createTest`}>
                        <a className='bg-blue-400 p-4 rounded text-sm w-32 text-center'>Create Test</a>
                    </Link>
                </div>

            </div>
            <div className="mt-6 h-full">
                {
                    isLoading && <div className='flex justify-center h-96  items-center text-red-400 font-bold tracking-wider animate-spin text-4xl'><RiLoader5Line /></div>
                }
                {
                    error && <div className='flex justify-center h-96  items-center text-red-400 font-bold text-lg tracking-wider'>{error.message}</div>
                }
                {
                    data &&
                    <DashboardTables columns={columns} data={dataTest} />
                }


            </div>
        </DashboardLayout>
    )
}

export default DetailsPage;