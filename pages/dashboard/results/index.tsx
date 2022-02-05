import React, { useEffect, useState } from 'react'
import { NextPage } from "next";
import Link from 'next/link'
import { DashboardLayout } from '@components/layouts'
import { DashboardTables } from "@components/tables";
import { useResultList } from '@modules/hooks/dashboard/results'
import { IUser } from '@modules/entities/user';
import { format } from 'date-fns'
import { RiLoader5Line } from 'react-icons/ri'
import { IUserExam } from '@modules/dto/exam';



const Accounts: NextPage = () => {
    const { data: dataResults, error, isLoading } = useResultList()
    const columns = React.useMemo(
        () => [
            {
                Header: 'Nomor Ujian',
                accessor: 'testCode', // accessor is the "key" in the data

            },
            {
                Header: 'Tanggal Pendaftaran',
                accessor: 'registrationDate',
                Cell:(row:any) => <div>{format(new Date(row.value), 'dd MMMM yyyy')}</div>
            },
            {
                Header: 'Name',
                accessor: 'Account.name',

            },
            {
                Header: 'Status',
                accessor: 'status',

            },
            {
                Header: 'Tanggal Lahir',
                accessor: 'Account.tglLahir',
                Cell:(row:any) => <div>{format(new Date(row.value), 'dd MMMM yyyy')}</div>


            }, {
                accessor: 'id',
                Cell: (row: any) => {

                    return (
                        <div className='flex flex-row space-x-4 justify-center items-center'>
                            {row.cell.row.values.type !== 'ADMIN' ? <Link href={`/dashboard/results/${row?.cell.row.values.testCode}`}><a className='text-blue-500'>Detail</a></Link> : null}
                        </div>
                    )
                }
            }

        ],

        []

    )

    const data = React.useMemo(
        () => dataResults,
        [dataResults])


    const [search, setSearch] = useState<string>('')

    const handleSearch = (value: string) => {

        setSearch(value)
    }

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold">Hasil Ujian</h1>
            <div className='mt-12 flex justify-between items-center'>
                {/* <div className='flex flex-row space-x-4'>
                    <Link href='/dashboard/accounts/create'>
                        <a className='bg-blue-400 p-4 rounded text-sm w-32 text-center'>Pendaftaran</a>
                    </Link>
                </div> */}
                <input
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    id="password"
                    placeholder='Cari Peserta'
                    className='border text-black border-gray-400 p-4 rounded text-sm focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gray-600'
                />
            </div>
            <div className="mt-6 h-full">
                {
                    isLoading && <div className='flex justify-center h-96  items-center text-red-400 font-bold tracking-wider animate-spin text-4xl'><RiLoader5Line /></div>
                }
                {
                    error && <div className='flex justify-center h-96  items-center text-red-400 font-bold text-lg tracking-wider'>{error.message}</div>
                }
                {
                    dataResults &&
                    <DashboardTables columns={columns} data={data as IUserExam[]} search={search} />
                }


            </div>

        </DashboardLayout>
    )
}

export default Accounts