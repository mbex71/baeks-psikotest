import React, { useEffect, useState } from 'react'
import { NextPage } from "next";
import { useRouter } from 'next/router';
import { DashboardLayout } from '@components/layouts'
import { useForm } from 'react-hook-form'


import { useCreateExam } from '@modules/hooks/exam'
import { TParamDetailAccount } from '@modules/dto/account';

type TFormData = {
    tujuan: string,
}

const CreateTest: NextPage = () => {
    const { register, handleSubmit } = useForm<TFormData>()
    const { mutate } = useCreateExam()
    const router = useRouter()

    const { username } = router.query as TParamDetailAccount

    const onSubmit = (value: TFormData) => {
        mutate({ tujuan: value.tujuan, username: username }, {
            onSuccess: () => {
                router.push(`/dashboard/accounts/${username}`)
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
                        <label className='text-sm mb-2' htmlFor="tujuan">Tujuan</label>
                        <input {...register('tujuan')} id='tujuan' className='p-2 rounded text-black text-sm outline-none' type="text" />
                    </div>
                    <div>
                        <button className='bg-red-500 w-full p-2 text-sm rounded'>Daftar</button>
                    </div>
                </form>
            </div>

        </DashboardLayout>
    )
}

export default CreateTest