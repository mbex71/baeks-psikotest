import React, { useEffect, useState } from 'react'
import { NextPage } from "next";
import { DashboardLayout } from '@components/layouts'
import { useForm } from 'react-hook-form'
import { useGetTimer, useUpdateTimer } from '@modules/hooks/dashboard/settings'



type TFormSettings = {
    timer: number,
}

const Accounts: NextPage = () => {
    const { register, handleSubmit, errors, setValue } = useForm<TFormSettings>()
    const { data } = useGetTimer()
    const { mutateAsync } = useUpdateTimer()

    const onSubmit = (data: TFormSettings) => {
        console.log('Value : ', data)
        mutateAsync({ timer: data.timer * 1000 }).then(() => {
            alert('Sukses Update')
        }).catch(e => alert(e))
    }

    useEffect(() => {
        if (data) {

            setValue('timer', data.timer / 1000)
        }


    }, [data])

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold">Settings</h1>
            <div className='flex justify-center py-12'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-1/2'>
                    <div className='mt-12 flex flex-row items-center justify-start space-x-4 w-full'>
                        <label className='mb-2 w-1/3' htmlFor="timer">Timer (Detik)</label>
                        <input
                            {...register('timer')}
                            type="number"
                            id="timmer"
                            placeholder='Timer Ujian'
                            className='border text-black border-gray-400 p-2 rounded text-sm focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gray-600 w-2/3'
                        />
                    </div>

                    <button className='w-full  bg-red-400 p-2 mt-6 rounded'>Save</button>
                </form>
            </div>


        </DashboardLayout>
    )
}

export default Accounts