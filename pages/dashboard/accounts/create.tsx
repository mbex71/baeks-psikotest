import React, { useEffect, useState } from 'react'
import { NextPage } from "next";
import { useRouter } from 'next/router';
import { DashboardLayout } from '@components/layouts'
import { useForm } from 'react-hook-form'
import { useCreateAccount } from '@modules/hooks/dashboard/accounts'
import { RiLoader5Line } from 'react-icons/ri'

type TFormData = {
    name: string,
    tglLahir: string,
    tujuan: string,
}

const Accounts: NextPage = () => {
    const { register, handleSubmit } = useForm<TFormData>()
    const { mutate, isLoading } = useCreateAccount()
    const router = useRouter()

    const onSubmit = (value: TFormData) => {
        mutate(value, {
            onSuccess: () => {
                router.push('/dashboard/accounts')
            },
            onError: (error) => {
                alert('Error: ' + error)
            }
        })
    }

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold">Account Peserta</h1>
            <div className='mt-12 w-full flex flex-col justify-center items-center'>
                <h2 className='mb-6 text-xl'>Pendaftaran peserta</h2>
                <form className='w-1/2 flex flex-col space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label className='text-sm mb-2' htmlFor="name">Name</label>
                        <input {...register('name')} id='name' className='p-2 rounded text-black text-sm outline-none' type="text" />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm mb-2' htmlFor="tglLahir">Tanggal lahir</label>
                        <input {...register('tglLahir')} id='tglLahir' className='p-2 rounded text-black text-sm outline-none' type="date" />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm mb-2' htmlFor="tujuan">Tujuan</label>
                        <input {...register('tujuan')} id='tujuan' className='p-2 rounded text-black text-sm outline-none' type="text" />
                    </div>
                    <div>
                    
                        <button className='bg-red-500 w-full p-2 text-sm rounded flex justify-center items-center' disabled={isLoading}>{isLoading ? <RiLoader5Line className='text-center animate-spin'/> : 'Daftar'}</button>
                    </div>
                </form>
            </div>

        </DashboardLayout>
    )
}

export default Accounts